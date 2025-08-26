
import { getAuth } from './auth.js'
export async function apiFetch(path, options={}){
  const auth = getAuth()
  const headers = {'Content-Type':'application/json', ...(auth?.token?{Authorization:`Bearer ${auth.token}`}:{}) , ...(options.headers||{})}
  const res = await fetch(path, { ...options, headers })
  const data = await res.json().catch(()=>({}))
  console.log('API Response:', data)
  
  if(!res.ok) throw new Error(data?.message || 'Request failed')
  return data
}
