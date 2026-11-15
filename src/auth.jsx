// Demo auth layer: persists to localStorage. To go live, replace the bodies of `api`
// methods with fetch() calls to your backend; the UI only talks to this object.
import {createContext,useContext,useEffect,useState} from 'react'
const K={users:'kr_users',session:'kr_session',fb:'kr_feedback'}
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v))
const hash=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,'0')).join('')
export const api={
  async me(){return read(K.session,null)},
  async register({name,email,password}){
    const users=read(K.users,[]);email=email.trim().toLowerCase()
    if(users.some(u=>u.email===email)) throw new Error('An account with this email already exists. Sign in instead.')
    const u={id:crypto.randomUUID(),name:name.trim(),email,pw:await hash(password)}
    write(K.users,[...users,u]);const s={id:u.id,name:u.name,email:u.email};write(K.session,s);return s},
  async login({email,password}){
    const u=read(K.users,[]).find(x=>x.email===email.trim().toLowerCase())
    if(!u||u.pw!==await hash(password)) throw new Error('Email or password is incorrect.')
    const s={id:u.id,name:u.name,email:u.email};write(K.session,s);return s},
  async logout(){localStorage.removeItem(K.session)},
  // Feedback is stored without name, email or user id, matching the "anonymous" promise on the form.
  async submitFeedback(r){write(K.fb,[...read(K.fb,[]),{...r,at:new Date().toISOString()}])}
}
const Ctx=createContext(null);export const useAuth=()=>useContext(Ctx)
export function AuthProvider({children}){
  const [user,setUser]=useState(null),[ready,setReady]=useState(false)
  useEffect(()=>{api.me().then(u=>{setUser(u);setReady(true)})},[])
  const wrap=fn=>async a=>{const u=await fn(a);setUser(u);return u}
  return <Ctx.Provider value={{user,ready,login:wrap(api.login),register:wrap(api.register),logout:async()=>{await api.logout();setUser(null)}}}>{children}</Ctx.Provider>}
