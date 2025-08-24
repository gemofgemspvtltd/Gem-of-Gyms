
import React, { useEffect, useState } from 'react'
import { apiFetch } from '../../services/api.js'


export default function Dashboard(){
  const [m,setM]=useState(null); 
  const [detail,setDetail]=useState([]);
   const [type,setType]=useState('');
  useEffect(()=>{ apiFetch('/api/dashboard/metrics').then(setM).catch(console.error) },[])
  async function show(t){ setType(t); const d = await apiFetch(`/api/dashboard/detail?type=${t}`); setDetail(d) }
  return (<div>
    <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16}}>
      <Card title='Active Members' value={m?.active_members??'—'} onClick={()=>show('active')}/>
      <Card title='Today’s Plan Expiry' value={m?.plans_expiring_today??'—'} onClick={()=>show('expiring')}/>
      <Card title='Today’s Collection' value={m?.todays_collection??'—'} onClick={()=>show('collection')}/>
      <Card title='Check-ins (today)' value={m?.todays_checkins??'—'}/>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginTop:16}}>
      <div style={{background:'#fff', padding:12, border:'1px solid #eee', borderRadius:8}}>
        <h3>Details: {type||'—'}</h3>
        <ul>{detail.map((r,i)=>(<li key={i}>{Object.values(r).join(' • ')}</li>))}</ul>
      </div>
      <div style={{background:'#fff', padding:12, border:'1px solid #eee', borderRadius:8}}>
        <h3>Today’s Birthdays</h3>
        <Birthdays />
      </div>
    </div>
  </div>)
}
function Card({title,value,onClick}){ return (<div onClick={onClick} style={{background:'#fff', border:'1px solid #eee', borderRadius:8, padding:16, cursor:onClick?'pointer':'default'}}><div style={{fontSize:14, color:'#666'}}>{title}</div><div style={{fontSize:28, fontWeight:700}}>{value}</div></div>) }
function Birthdays(){ const [rows,setRows]=useState([]); useEffect(()=>{ apiFetch('/api/dashboard/birthdays').then(setRows).catch(()=>{}) },[]); if(!rows.length) return <div>No birthdays today</div>; return <ul>{rows.map((r,i)=><li key={i}>{r.NAME}</li>)}</ul> }
