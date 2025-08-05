import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../utils/auth'
import { Shield } from 'lucide-react'

export default function Login(){
  const [u,setU]=useState('')
  const [p,setP]=useState('')
  const [err,setErr]=useState('')
  const nav=useNavigate()

  const submit=(e)=>{
    e.preventDefault()
    if(login(u,p)) nav('/admin/dashboard')
    else setErr('Kullanıcı adı veya şifre hatalı.')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><Shield/> Admin Giriş</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-3 border rounded" placeholder="Kullanıcı adı" value={u} onChange={e=>setU(e.target.value)}/>
        <input className="w-full p-3 border rounded" type="password" placeholder="Şifre" value={p} onChange={e=>setP(e.target.value)}/>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">Giriş Yap</button>
      </form>
    </div>
  )
}
