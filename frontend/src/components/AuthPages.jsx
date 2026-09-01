import React,{useState}from'react';import{useNavigate}from'react-router-dom';import{api}from'../api/api.js';
const TYPES=['Retail','Manufacturing','Services','Agriculture','Industry'];
function Field({label,type='text',value,onChange}){return <label className="field"><span>{label}</span><input required type={type} value={value} onChange={e=>onChange(e.target.value)}/></label>}
export function SMERegister(){const n=useNavigate();const[f,setF]=useState({sme_name:'',owner_name:'',email:'',password:'',business_type:'',location:'Urban',employees:'',years_operation:''});const[msg,setMsg]=useState('');const submit=async e=>{e.preventDefault();setMsg('');try{await api.smeRegister(f);n('/login')}catch(x){setMsg(x.message)}};return <Page title="SME Registration" text="Create your business account"><form onSubmit={submit}><Field label="SME / Business Name" value={f.sme_name} onChange={v=>setF({...f,sme_name:v})}/><Field label="Owner / Manager Name" value={f.owner_name} onChange={v=>setF({...f,owner_name:v})}/><Field label="Email" type="email" value={f.email} onChange={v=>setF({...f,email:v})}/><Field label="Password" type="password" value={f.password} onChange={v=>setF({...f,password:v})}/><label className="field"><span>Industry / Business Type</span><select required value={f.business_type} onChange={e=>setF({...f,business_type:e.target.value})}><option value="">Select industry</option>{TYPES.map(t=><option key={t}>{t}</option>)}</select></label><label className="field"><span>Location</span><select value={f.location} onChange={e=>setF({...f,location:e.target.value})}><option>Urban</option><option>Rural</option></select></label><Field label="Number of Employees" type="number" value={f.employees} onChange={v=>setF({...f,employees:v})}/><Field label="Years of Operation" type="number" value={f.years_operation} onChange={v=>setF({...f,years_operation:v})}/>{msg&&<p className="error">{msg}</p>}<div className="auth-buttons">
  <button
    type="button"
    className="secondary"
    onClick={() => n('/')}
  >
    Back to Home
  </button>

  <button
    type="submit"
    className="primary"
  >
    Register SME
  </button>
</div></form></Page>}
export function SMELogin({onLogin}){const n=useNavigate();const[f,setF]=useState({email:'',password:''});const[msg,setMsg]=useState('');const submit=async e=>{e.preventDefault();try{const d=await api.smeLogin(f);localStorage.setItem('activeSme',JSON.stringify(d.sme));onLogin(d.sme);n('/dashboard')}catch(x){setMsg(x.message)}};return <Page title="SME Login" text="Login to access SME Digi"><form onSubmit={submit}><Field label="Email" type="email" value={f.email} onChange={v=>setF({...f,email:v})}/><Field label="Password" type="password" value={f.password} onChange={v=>setF({...f,password:v})}/>{msg&&<p className="error">{msg}</p>}<div className="auth-buttons">
  <button
    type="button"
    className="secondary"
    onClick={() => n('/')}
  >
    Back to Home
  </button>

  <button
    type="submit"
    className="primary"
  >
    Login
  </button>
</div></form></Page>}
export function AdminRegister(){const n=useNavigate();const[f,setF]=useState({name:'',email:'',password:''});const[msg,setMsg]=useState('');const submit=async e=>{e.preventDefault();try{await api.adminRegister(f);n('/admin/login')}catch(x){setMsg(x.message)}};return <Page title="Admin Registration" text="Prototype administrator setup"><form onSubmit={submit}><Field label="Admin Name" value={f.name} onChange={v=>setF({...f,name:v})}/><Field label="Email" type="email" value={f.email} onChange={v=>setF({...f,email:v})}/><Field label="Password" type="password" value={f.password} onChange={v=>setF({...f,password:v})}/>{msg&&<p className="error">{msg}</p>}<div className="auth-buttons">
  <button
    type="button"
    className="secondary"
    onClick={() => n('/')}
  >
    Back to Home
  </button>

  <button
    type="submit"
    className="primary"
  >
    Register Admin
  </button>
</div></form></Page>}
export function AdminLogin({onLogin}){const n=useNavigate();const[f,setF]=useState({email:'',password:''});const[msg,setMsg]=useState('');const submit=async e=>{e.preventDefault();try{const d=await api.adminLogin(f);localStorage.setItem('adminUser',JSON.stringify(d.admin));onLogin(d.admin);n('/admin')}catch(x){setMsg(x.message)}};return <Page title="Admin Login" text="Administrator access"><form onSubmit={submit}><Field label="Email" type="email" value={f.email} onChange={v=>setF({...f,email:v})}/><Field label="Password" type="password" value={f.password} onChange={v=>setF({...f,password:v})}/>{msg&&<p className="error">{msg}</p>}<div className="auth-buttons">
  <button
    type="button"
    className="secondary"
    onClick={() => n('/')}
  >
    Back to Home
  </button>

  <button
    type="submit"
    className="primary"
  >
    Login
  </button>
</div></form></Page>}
function Page({ title, text, children }) {
  return (
    <div className="page">
      <div className="card auth">
        <h1>{title}</h1>

        <p className="muted">
          {text}
        </p>

        {children}
      </div>
    </div>
  );
}