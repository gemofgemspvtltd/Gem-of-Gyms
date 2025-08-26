
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'

// import App from './App';
import Login from './pages/Auth/Login.jsx'
import TenantSignup from './components/TenantSignup.jsx'
// import Signup from './pages/Auth/Signup.jsx'
import Forgot from './pages/Auth/Forgot.jsx'
import Dashboard from './pages/Auth/Dashboard.jsx'
import Members from './pages/Auth/Members.jsx'
import Membership from './pages/Auth/Membership.jsx'
import Account from './pages/Auth/Account.jsx';
import { getAuth } from './services/auth.js'
// import routes from '../../backend/src/routes/tenant.js';
import ReactDOM from 'react-dom/client';
function PrivateRoute({ children })
{ const a=getAuth();
   return a? children : <Navigate to="/login" replace/> }

function PublicRoute({ children }) {
  const auth = getAuth();
  return auth ? <Navigate to="/" replace /> : children;
}

// const router = createBrowserRouter(routes, {
//   future: { v7_startTransition: true }
// });
// const rootElement = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElement);
// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      
      <Routes>
         <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      {/* <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } 
      /> */}
 <Route path="/tenant-signup" 
 element={<PublicRoute><TenantSignup /></PublicRoute>} />

      <Route 
        path="/forgot" 
        element={
          <PublicRoute>
            <Forgot />
          </PublicRoute>
        } 
      />
        <Route path="/" element={<PrivateRoute><App /></PrivateRoute>}>
        <Route index element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="members" element={<Members />} />
        <Route path="membership" element={<Membership />} />
         <Route path="account" element={<Account />} />


        
        <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
