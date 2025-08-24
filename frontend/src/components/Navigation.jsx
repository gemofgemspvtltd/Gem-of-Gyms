  // <nav style={{display:'flex',gap:16, padding:'10px 16px', borderBottom:'1px solid #eee'}}>
  //     <Link to="/">Dashboard</Link>
  //   </nav>


  import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

export default function Navigation() {
  const location = useLocation();

  const isActiveTab = (path) => {
    return location.pathname === path ? 'nav-tab active' : 'nav-tab';
  };

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        <Link to="/" className={isActiveTab('/')}>
          <span className="nav-icon">📊</span>
          Dashboard
        </Link>
        <Link to="/members" className={isActiveTab('/members')}>
          <span className="nav-icon">👥</span>
          Members
        </Link>
        <Link to="/membership" className={isActiveTab('/membership')}>
          <span className="nav-icon">📋</span>
          Membership
        </Link>
      </div>
    </nav>
  );
}
