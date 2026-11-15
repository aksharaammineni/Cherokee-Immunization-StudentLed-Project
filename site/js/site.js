/* Kindergarten Ready: small vanilla JS layer. Auth is a browser-only demo.
   To go live, replace the bodies of `api` with fetch() calls to your backend. */
(function(){
const K={users:'kr_users',session:'kr_session',fb:'kr_feedback'};
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const hash=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,'0')).join('');
const api={
  me:()=>read(K.session,null),
  async register({name,email,password}){
    const users=read(K.users,[]);email=email.trim().toLowerCase();
    if(users.some(u=>u.email===email))throw new Error('An account with this email already exists. Sign in instead.');
    const u={id:crypto.randomUUID(),name:name.trim(),email,pw:await hash(password)};
    write(K.users,users.concat(u));const s={id:u.id,name:u.name,email:u.email};write(K.session,s);return s},
  async login({email,password}){
    const u=read(K.users,[]).find(x=>x.email===email.trim().toLowerCase());
    if(!u||u.pw!==await hash(password))throw new Error('Email or password is incorrect.');
    const s={id:u.id,name:u.name,email:u.email};write(K.session,s);return s},
  logout:()=>localStorage.removeItem(K.session),
  // Stored without name, email or user id, matching the "anonymous" promise on the form.
  submitFeedback:r=>write(K.fb,read(K.fb,[]).concat({...r,at:new Date().toISOString()}))
};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
function renderAuth(){
  const u=api.me();
  $$('[data-auth]').forEach(box=>{
    const m=box.dataset.auth==='mobile';
    box.innerHTML=u
      ?`<span class="text-sm text-slate-600">Hi, ${u.name.split(' ')[0].replace(/[<>&"]/g,'')}</span><button type="button" data-logout class="btn btn-ghost !py-1.5 text-sm">Sign out</button>`
      :`<a href="login.html" class="${m?'btn btn-ghost':'text-sm font-semibold text-navy hover:underline'}">Sign in</a><a href="register.html" class="btn btn-primary ${m?'':'!py-1.5 text-sm'}">Create account</a>`;
  });
  $$('[data-logout]').forEach(b=>b.onclick=()=>{api.logout();renderAuth()});
  $$('[data-signed-out]').forEach(e=>e.hidden=!!u);$$('[data-signed-in]').forEach(e=>e.hidden=!u);
}
const btn=$('[data-menu-btn]'),menu=$('[data-menu]');
if(btn)btn.onclick=()=>{const open=menu.hidden;menu.hidden=!open;btn.setAttribute('aria-expanded',String(open))};
const showErr=(f,m)=>{const e=$('[data-error]',f);e.textContent=m;e.hidden=!m};
const next=()=>{const n=new URLSearchParams(location.search).get('next');return /^[a-z]+\.html$/.test(n||'')?n:'voices.html'};
const forms={
  async login(f,d){await api.login(d);location.href=next()},
  async register(f,d){if(d.password!==d.confirm)throw new Error('Passwords do not match.');await api.register(d);location.href=next()},
  async feedback(f,d){api.submitFeedback(d);f.hidden=true;$('[data-thanks]').hidden=false;f.reset()}
};
$$('form[data-form]').forEach(f=>f.addEventListener('submit',async e=>{
  e.preventDefault();showErr(f,'');const b=$('button[type=submit]',f);b.disabled=true;
  try{await forms[f.dataset.form](f,Object.fromEntries(new FormData(f)))}
  catch(x){showErr(f,x.message||'Something went wrong. Please try again.')}
  b.disabled=false;
}));
const again=$('[data-again]');
if(again)again.onclick=()=>{$('[data-thanks]').hidden=true;$('form[data-form=feedback]').hidden=false};
$$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
renderAuth();
})();
