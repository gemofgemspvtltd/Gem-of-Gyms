
// import React, { useState } from "react";
// import "../../styles/Login.css";
// import { login } from "../../services/auth.js";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     try {
//       // await login(username, password);
//       console.log("🔹 Trying login with:", username, password);
//     const res = await login(username, password);  // call to backend
//     console.log("✅ Login success:", res);
//       nav("/");
//     } catch (e) {
//       // setErr(e.message);
//       console.error("❌ Login error:", e);
//     setErr(e.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <div className="login-logo">🏋️‍♂️</div>
//         <h2 className="login-title">Gem of Gym</h2>
//         <p className="login-subtitle">Welcome To Your GYM Management System</p>
//  {err && <div className="error">{err}</div>} 
//         <div className="login-tabs">
//           <button className="tab active">Login</button>
//           <Link to="/signup" className="tab">Sign Up</Link>
//         </div>
//       <form className="login-form" onSubmit={submit}>
//         {/* <h2 className="login-title">Sign in</h2> */}
//         {err && <div className="login-error">{err}</div>}
//         <div className="login-inputs">
//           <label>Username</label><br />
//           <input
//             placeholder="Username or Email"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           /><br></br>
//           <label>Password</label><br />
//           <input
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           /><br></br>
//           <button type="submit" className="btn-submit">Sign In</button>
//         </div>
//         <div className="login-links">
//           {/* <Link to="/signup">Sign up</Link> */}
//           <Link to="/forgot">Forgot password</Link>
//         </div>
        
//       </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { login } from '../../services/auth.js';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Login.css';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    tenantId: ''
  });
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load available tenants for demo (in production, you might determine this by subdomain)
  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await fetch('/api/tenants/list');
      const data = await res.json();
      setTenants(data);
    } catch (error) {
      console.error('Failed to fetch tenants:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(form.username, form.password, form.tenantId);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">G</div>
        <h2 className="login-title">Gem of Gym</h2>
        <p className="login-subtitle">Sign in to your gym</p>

        {error && <div className="error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Select Your Gym</label>
          <select
            value={form.tenantId}
            onChange={(e) => setForm({...form, tenantId: e.target.value})}
            // required
          >
            <option value="">Choose your gym...</option>
            {tenants.map(tenant => (
              <option key={tenant.TENANT_ID} value={tenant.TENANT_ID}>
                {tenant.TENANT_NAME}
              </option>
            ))}
          </select>

          <label>Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({...form, username: e.target.value})}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            required
          />

          <button type="submit" className="btn-submit">
            Sign In
          </button>
        </form>

        <p>
          Don't have a gym account? <Link to="/tenant-signup">Register Your Gym</Link>
        </p>
      </div>
    </div>
  );
}



