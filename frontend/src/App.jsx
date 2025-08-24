
import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { getAuth, logout } from './services/auth.js'
import Header from './components/Header.jsx'
export default function App(){
  const nav = useNavigate(); const auth=getAuth();
  const handleLogout = () => {
    logout();
    nav('/login');
  };

  if (!auth) {
    // If not authenticated, redirect to login
    nav('/login');
    return null;
  }

  return (<div>  
    <Header />
     
  <main style={{padding:0}}><Outlet/></main>
</div>)
}
