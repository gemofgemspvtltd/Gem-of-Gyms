


// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { getAuth, logout } from '../services/auth.js';
// import '../styles/Header.css';

// export default function Header() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const auth = getAuth();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const isActiveTab = (path) => {
//     return location.pathname === path ? 'nav-tab active' : 'nav-tab';
//   };

//   return (
//     <header className="app-header">
//       <div className="header-container">
//         {/* Logo Section */}
//         <div className="logo-section">
//           <div className="logo-icon">G</div>
//           <h1 className="logo-text">Gem of Gym</h1>
//         </div>

//         {/* Navigation Tabs */}
//         <nav className="nav-tabs">
//           <Link to="/" className={isActiveTab('/')}>
//             <span className="nav-icon">📊</span>
//             Dashboard
//           </Link>
//           <Link to="/members" className={isActiveTab('/members')}>
//             <span className="nav-icon">👥</span>
//             Members
//           </Link>
//           <Link to="/membership" className={isActiveTab('/membership')}>
//             <span className="nav-icon">📋</span>
//             Membership
//           </Link>
//         </nav>

//         {/* User Profile Section */}
//         <div className="user-profile">
//           <div className="user-info">
//             <div className="user-name">Admin User</div>
//             <div className="user-role">Administrator</div>
//           </div>
//           <div className="user-avatar" onClick={handleLogout}>
//             AU
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, logout } from '../services/auth.js';
import '../styles/Header.css';

export default function Header() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">G</div>
          <h1 className="logo-text">Gem of Gym</h1>
        </div>

        {/* User Profile Section */}
        <div className="user-profile">
          <div className="user-info">
            <div className="user-name">Admin User</div>
            <div className="user-role">Administrator</div>
          </div>
          <div className="user-avatar" onClick={handleLogout}>
            AU
          </div>
        </div>
      </div>
    </header>
  );
}



