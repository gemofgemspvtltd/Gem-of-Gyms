
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/Auth/Login.jsx'
import Signup from './pages/Auth/Signup.jsx'
import Forgot from './pages/Auth/Forgot.jsx'
import Dashboard from './pages/Auth/Dashboard.jsx'
import Members from './pages/Auth/Members.jsx'
import Membership from './pages/Auth/Membership.jsx'
import { getAuth } from './services/auth.js'
function PrivateRoute({ children })
{ const a=getAuth();
   return a? children : <Navigate to="/login" replace/> }

function PublicRoute({ children }) {
  const auth = getAuth();
  return auth ? <Navigate to="/" replace /> : children;
}


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
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } 
      />
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
      {/* </Route> */}

          {/* <Route path="login" element={<Login/>} />
          <Route path="signup" element={<Signup/>} />
          <Route path="forgot" element={<Forgot/>} /> */}
           {/* Protected routes with header */}
      {/* <Route path="/" element={<PrivateRoute><App /></PrivateRoute>}> */}
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
