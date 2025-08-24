
export async function login(username, password){
  const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username, password }) })
  const data = await res.json(); if(!res.ok) throw new Error(data?.message||'Login failed'); saveAuth(data); return data;
}
export async function signup(payload){
  const res = await fetch('/api/auth/signup', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  const data = await res.json(); if(!res.ok) throw new Error(data?.message||'Signup failed'); return data;
}
export function saveAuth(a){ localStorage.setItem('auth', JSON.stringify(a)) }
export function getAuth(){ const v=localStorage.getItem('auth'); return v? JSON.parse(v): null }
export function logout(){ localStorage.removeItem('auth') }


