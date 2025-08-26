
// import React, { useState } from 'react'
// import { signup } from '../../services/auth.js'
// import { useNavigate } from 'react-router-dom'
// export default function Signup(){
//   const [form,setForm]=useState({ username:'', password:'', name:'', mobile:'', email:'' }); const [msg,setMsg]=useState(''); const nav=useNavigate();
//   const submit=async(e)=>{ e.preventDefault(); setMsg(''); try{ await signup(form); setMsg('Account created.'); setTimeout(()=>nav('/login'), 600);}catch(e){ setMsg(e.message) } }
//   return (<div style={{display:'flex', minHeight:'100vh', alignItems:'center', justifyContent:'center', background:'#f6f7fb'}}>
//     <form onSubmit={submit} style={{background:'#fff', padding:24, borderRadius:12, width:400, boxShadow:'0 10px 30px rgba(0,0,0,0.08)'}}>
//       <h2 style={{textAlign:'center', marginBottom:16}}>Create account</h2>
//       {msg && <div style={{marginBottom:8}}>{msg}</div>}
//       <div style={{display:'grid', gap:8}}>
//         <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
//         <input placeholder="Mobile" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})} />
//         <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
//         <input placeholder="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required />
//         <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
//         <button type="submit">Sign Up</button>
//       </div>
//     </form></div>)
// }

import React, { useState } from 'react';
import { signup } from '../../services/auth.js';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Login.css';

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    mobile: '',
    email: ''
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await signup(form);
      setMsg('Account created successfully!');
      setTimeout(() => navigate('/login'), 600);
    } catch (error) {
      setMsg(error.message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">G</div>
        <h2 className="login-title">Create Account</h2>
        <p className="login-subtitle">Sign up for Gym Management System</p>
        
        <div className="login-tabs">
          <Link to="/login" className="tab">Login</Link>
          <Link to="/signup" className="tab active">Signup</Link>
        </div>
        
        {msg && <div className={msg.includes('successfully') ? 'success' : 'error'}>{msg}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          
          <label>Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
          />
          
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit" className="btn-submit">
            Create Account
          </button>
        </form>
        
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
