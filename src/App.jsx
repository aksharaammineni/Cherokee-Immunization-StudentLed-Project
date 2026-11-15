import {useState,useEffect} from 'react'
import {HashRouter,Routes,Route,NavLink,Link,useLocation} from 'react-router-dom'
import {AuthProvider,useAuth} from './auth'
import {Home,Issue,Vaccines,Decline,Voices,Resources,About,Login,Register} from './pages'
const nav=[['/','Home'],['/issue','The issue'],['/vaccines','Kindergarten vaccines'],['/decline','Why rates are declining'],['/voices','Parent voices'],['/resources','Parent resources'],['/about','About & contact']]
function Mark(){return <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="16" fill="#12294d"/><path d="M17 8.5 24.5 12v6c0 4.2-3.1 7.2-7.5 8.5C12.6 25.2 9.5 22.2 9.5 18v-6z" fill="none" stroke="#e9d6a6" strokeWidth="1.6"/><path d="m13.6 17.2 2.6 2.6 4.4-5" fill="none" stroke="#e9d6a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
function Header(){
  const [open,setOpen]=useState(false),{user,logout}=useAuth(),loc=useLocation()
  useEffect(()=>{setOpen(false);window.scrollTo(0,0)},[loc.pathname])
  const link=({isActive})=>`block py-2 lg:py-1 text-[15px] font-medium border-b-2 ${isActive?'border-gold text-navy':'border-transparent text-slate-600 hover:text-navy'}`
  return <header className="sticky top-0 z-30 border-b border-sky-200 bg-white/95 backdrop-blur">
    <div className="wrap flex h-16 items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2.5"><Mark/><span className="font-display text-[17px] font-semibold leading-tight text-navy">Kindergarten Ready<span className="block text-xs font-normal text-slate-500">Cherokee County, Georgia</span></span></Link>
      <nav aria-label="Main" className="hidden items-center gap-5 lg:flex">{nav.slice(1).map(([to,t])=><NavLink key={to} to={to} className={link}>{t.replace('Kindergarten vaccines','Vaccines').replace('Why rates are declining','Decline').replace('Parent resources','Resources').replace('About & contact','About')}</NavLink>)}</nav>
      <div className="hidden items-center gap-3 lg:flex">{user?<><span className="text-sm text-slate-600">Hi, {user.name.split(' ')[0]}</span><button onClick={logout} className="btn btn-ghost !py-1.5 text-sm">Sign out</button></>:<><Link to="/login" className="text-sm font-semibold text-navy hover:underline">Sign in</Link><Link to="/register" className="btn btn-primary !py-1.5 text-sm">Create account</Link></>}</div>
      <button className="rounded p-2 text-navy lg:hidden" aria-expanded={open} aria-label="Menu" onClick={()=>setOpen(!open)}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open?'M5 5l14 14M19 5 5 19':'M4 7h16M4 12h16M4 17h16'}/></svg></button>
    </div>
    {open&&<div className="border-t border-sky-200 bg-white lg:hidden"><nav className="wrap py-3">{nav.map(([to,t])=><NavLink key={to} to={to} end={to==='/'} className={link}>{t}</NavLink>)}
      <div className="mt-3 flex gap-3 border-t border-sky-200 pt-3">{user?<button onClick={logout} className="btn btn-ghost">Sign out</button>:<><Link to="/login" className="btn btn-ghost">Sign in</Link><Link to="/register" className="btn btn-primary">Create account</Link></>}</div></nav></div>}
  </header>}
function Footer(){return <footer className="bg-navy-900 text-sky-100">
  <div className="wrap grid gap-8 py-12 md:grid-cols-3">
    <div><p className="font-display text-xl text-white">Kindergarten Ready. Vaccine Protected.</p><p className="mt-2 text-sm text-sky-200/80">A student-led community awareness initiative in Cherokee County, Georgia.</p></div>
    <ul className="space-y-1.5 text-sm">{nav.map(([to,t])=><li key={to}><Link className="hover:text-gold-light" to={to}>{t}</Link></li>)}</ul>
    <p className="text-sm text-sky-200/80">This website is an educational awareness project, not a substitute for individualized medical advice. Ask your child's healthcare provider or local health department to confirm exact requirements.</p></div>
  <div className="border-t border-white/10 py-4 text-center text-xs text-sky-200/70">© {new Date().getFullYear()} Kindergarten Ready. Statistics from the Southern Alliance for Public Health Leadership; data year not stated by the source.</div></footer>}
export default function App(){return <AuthProvider><HashRouter><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to content</a><Header/>
  <main id="main"><Routes><Route path="/" element={<Home/>}/><Route path="/issue" element={<Issue/>}/><Route path="/vaccines" element={<Vaccines/>}/><Route path="/decline" element={<Decline/>}/><Route path="/voices" element={<Voices/>}/><Route path="/resources" element={<Resources/>}/><Route path="/about" element={<About/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="*" element={<Home/>}/></Routes></main><Footer/></HashRouter></AuthProvider>}
