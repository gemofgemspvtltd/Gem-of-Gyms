
// export async function login(username, password){
//   const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username, password }) })
//   const data = await res.json(); if(!res.ok) throw new Error(data?.message||'Login failed'); saveAuth(data); return data;
// }
// export async function signup(payload){
//   const res = await fetch('/api/auth/signup', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
//   const data = await res.json(); if(!res.ok) throw new Error(data?.message||'Signup failed'); return data;
// }
// export function saveAuth(a){ localStorage.setItem('auth', JSON.stringify(a)) }
// export function getAuth(){ const v=localStorage.getItem('auth'); return v? JSON.parse(v): null }
// export function logout(){ localStorage.removeItem('auth') }


// src/services/auth.js
// export async function tenantSignup(tenantData) {
//   const res = await fetch('/api/tenant/signup', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(tenantData)
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data?.message || 'Tenant signup failed');
//   return data;
// }

// export async function login(username, password, tenantId) {
//   const res = await fetch('/api/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password, tenantId })
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data?.message || 'Login failed');
//   saveAuth(data);
//   return data;
// }

// export function saveAuth(authData) {
//   localStorage.setItem('auth', JSON.stringify(authData));
// }

// export function getAuth() {
//   const authString = localStorage.getItem('auth');
//   return authString ? JSON.parse(authString) : null;
// }

// export function getTenantId() {
  // const auth = getAuth();
  // return auth?.tenant?.tenantId || auth?.tenantId;
// }

// export function logout() {
//   localStorage.removeItem('auth');
// }

export async function tenantSignup(tenantData) {
  const res = await 
  // fetch("http://localhost:5000/api/tenant/signup", {
  fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tenantData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || 'Tenant signup failed');
  return data;
}

// export async function signup(payload) {
//   const res = await fetch('/api/auth/signup', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload)
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data?.message || 'Signup failed');
//   return data;
// }

export async function login(username, password, tenantId) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, tenantId })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || 'Login failed');
  saveAuth(data);
  return data;
}

export function saveAuth(authData) {
  localStorage.setItem('auth', JSON.stringify(authData));
}

export function getAuth() {
  const authString = localStorage.getItem('auth');
  return authString ? JSON.parse(authString) : null;
}

export function getTenantId() {
  const auth = getAuth();
  return auth?.tenant?.tenantId || auth?.tenantId;
}

export function logout() {
  localStorage.removeItem('auth');
}


