import React, { useState } from 'react';
import { tenantSignup } from '../services/auth.js';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

export default function TenantSignup() {
  const [form, setForm] = useState({
    tenantName: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    subdomain: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // const { tenantName, email, password, fullName, subdomain } = form;
      // await tenantSignup({ tenantName, email, password, fullName, subdomain });
      await tenantSignup(form);
      alert('Gym registered successfully! You can now login.');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">G</div>
        <h2 className="login-title">Start Your Gym Management</h2>
        <p className="login-subtitle">Create your gym's account</p>

        {error && <div className="error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Gym Name</label>
          <input
            type="text"
            value={form.tenantName}
            onChange={(e) => setForm({...form, tenantName: e.target.value})}
            required
          />

          <label>Your Full Name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({...form, fullName: e.target.value})}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />

          <label>Subdomain (optional)</label>
          <input
            type="text"
            value={form.subdomain}
            onChange={(e) => setForm({...form, subdomain: e.target.value})}
            placeholder="your-gym-name"
          />

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
            required
          />

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Gym Account'}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
