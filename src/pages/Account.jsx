import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn, currentUser, getUsers, updateUserProfile, logout } from '../utils/auth'
import { User, Save, LogOut } from 'lucide-react'

export default function Account(){
  const nav = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', phone:'', about:'' })
  const [ready, setReady] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    if(!isLoggedIn()) { nav('/admin'); return }
    const cu = currentUser()
    const full = getUsers().find(u => u.id === cu.id)
    setForm({
      name: full?.name || '',
      email: full?.email || '',
      phone: full?.phone || '',
      about: full?.about || '',
    })
    setReady(true)
  }, [nav])

  if (!ready) return <div className="p-8 text-center text-gray-500">Yükleniyor…</div>

  const save = (e)=>{
    e.preventDefault()
    updateUserProfile({ name: form.name, phone: form.phone, about: form.about })
    setMsg('Bilgiler kaydedildi.')
    setTimeout(()=>setMsg(''), 2000)
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2"><User/> Hesabım</h2>
        <button onClick={()=>{ logout(); nav('/admin') }} className="flex items-center gap-2 text-gray-600 hover:text-red-600">
          <LogOut size={18}/> Çıkış
        </button>
      </div>
      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Ad Soyad</label>
          <input className="w-full p-3 border rounded" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">E-posta</label>
          <input className="w-full p-3 border rounded bg-gray-50" value={form.email} readOnly />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Telefon</label>
          <input className="w-full p-3 border rounded" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="+90 5xx xxx xx xx"/>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Hakkımda / Not</label>
          <textarea rows="4" className="w-full p-3 border rounded" value={form.about} onChange={e=>setForm({...form, about:e.target.value})}/>
        </div>
        <button className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 flex items-center gap-2 justify-center">
          <Save size={18}/> Kaydet
        </button>
        {msg && <p className="text-center text-green-700 text-sm">{msg}</p>}
      </form>
    </div>
  )
}
