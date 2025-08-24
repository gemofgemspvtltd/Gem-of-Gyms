
import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { getAuth, logout } from './services/auth.js'
import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx';
import '../src/styles/App.css';

export default function App(){
  const nav = useNavigate(); const auth=getAuth();
  const handleLogout = () => {
    logout();
    nav('/login');
  };

  // if (!auth) {
  //   // If not authenticated, redirect to login
  //   nav('/login');
  //   return null;
  // }

//   return (<div>  
//     <Header />
     
//   <main style={{padding:0}}><Outlet/></main>
// </div>)

return (
 <div className="app">
      <Header />
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );

}
