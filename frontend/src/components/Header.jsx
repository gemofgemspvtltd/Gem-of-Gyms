

// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAuth, logout } from '../services/auth.js';
// import '../styles/Header.css';

// export default function Header() {
//   const navigate = useNavigate();
//   const auth = getAuth();
//   // const userName = auth?.username || "Admin User"; // Replace with actual user name from auth
// const userName = auth?.user?.name || 
//                    auth?.user?.username || 
//                    auth?.name || 
//                    auth?.username || 
//                    'Admin User';
//    // State for dropdown visibility
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);


//   const getInitials = (name) => {
//     if (!name) return 'AU';
//     const names = name.split(' ');
//     if (names.length >= 2) {
//       return (names[0][0] + names[names.length - 1][0]).toUpperCase();
//     }
//     return name.substring(0, 2).toUpperCase();
//   };

//    const handleLogout = () => {
//     logout();
//     navigate('/login');
//     setShowDropdown(false);
//   };
// const handleAccount = () => {
//     // Navigate to account/profile page
//     navigate('/account');
//     setShowDropdown(false);
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };
// // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <header className="app-header">
//       <div className="header-container">
//         {/* Logo Section */}
//         <div className="logo-section">
//           <div className="logo-icon">G</div>
//           <h1 className="logo-text">Gem of Gym</h1>
//         </div>

//         {/* User Profile Section */}
//         <div className="user-profile">
//           <div className="user-info">
//             <div className="user-name">{userName}</div>
//             {/* <div className="user-name">Admin User</div> */}
//             <div className="user-role">Administrator</div>
//           </div>
//           {/* <div className="user-avatar" onClick={handleLogout}>
//             AU
//           </div> */}

//           <div className="user-avatar" onClick={toggleDropdown}>
//             {getInitials(userName)}
//           </div>

//           {/* Dropdown Menu */}
//           {showDropdown && (
//             <div className="user-dropdown">
//               <div className="dropdown-item" onClick={handleAccount}>
//                 <span className="dropdown-icon">👤</span>
//                 Account
//               </div>
//               <div className="dropdown-divider"></div>
//               <div className="dropdown-item logout" onClick={handleLogout}>
//                 <span className="dropdown-icon">🚪</span>
//                 Logout
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }


import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, logout } from '../services/auth.js';
import '../styles/Header.css';

export default function Header() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Get tenant and user data
  const tenantName = auth?.tenant?.tenantName || 'Your Gym';
  const userName = auth?.user?.fullName || auth?.user?.username || 'Admin User';
  const userRole = auth?.user?.role || 'Administrator';

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-icon">G</div>
          <h1 className="logo-text">{tenantName}</h1>
        </div>

        <div className="user-profile" ref={dropdownRef}>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-role">{userRole}</div>
          </div>
          
          <div 
            className="user-avatar" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {userName.substring(0, 2).toUpperCase()}
          </div>

          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-item">
                👤 Account Settings
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item logout" onClick={handleLogout}>
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}



