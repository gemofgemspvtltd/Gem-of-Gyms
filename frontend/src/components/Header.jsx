// import React from "react";

// export default function Header() {
//   return (
//     <header style={{ padding: "12px", background: "#333", color: "#fff" }}>
//       <h1>Gym Management</h1>
//     </header>
//   );
// }



import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout, getAuth } from '../services/auth.js'

export default function Header() {
  const nav = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <header style={{ 
      background: '#ff4d00', 
      color: 'white', 
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h1>GYM Management System</h1>
      </div>
      
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
          Dashboard
        </Link>
        <Link to="/members" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
          Members
        </Link>
        <Link to="/trainers" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
          Trainers
        </Link>
      </nav>
      
      <div>
        <span style={{ marginRight: '1rem' }}>Welcome, {auth?.user?.username || 'User'}</span>
        <button 
          onClick={handleLogout}
          style={{ 
            background: 'white', 
            color: '#ff4d00', 
            border: 'none', 
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
