import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { addUser, login } from '../utils/auth'
import { UserPlus, ArrowRight } from 'lucide-react'

export default function Signup(){
  const nav = useNavigate()
  const [form, setForm] = useState({ name:'', username:'', email:'', password:'', phone:'' })
  const [err, setErr] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setErr('')
    try {
      if (!form.name || !form.username || !form.email || !form.password) {
        setErr('Lütfen tüm zorunlu alanları doldurun.'); return
      }
      addUser({ name: form.name, username: form.username, email: form.email, password: form.password, phone: form.phone })
      // otomatik giriş ve yönlendirme
      const u = login(form.email, form.password)
      if (u?.role === 'admin') nav('/admin/dashboard')
      else nav('/my')
    } catch (e) {
      setErr(e?.message || 'Kayıt sırasında hata.')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><UserPlus/> Kayıt Ol</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-3 border rounded" placeholder="Ad Soyad" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="w-full p-3 border rounded" placeholder="Kullanıcı adı" value={form.username} onChange={e=>setForm({...form, username:e.target.value})}/>
        <input className="w-full p-3 border rounded" type="email" placeholder="E-posta" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="w-full p-3 border rounded" type="password" placeholder="Şifre" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <input className="w-full p-3 border rounded" placeholder="Telefon (opsiyonel)" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 flex items-center gap-2 justify-center">
          <ArrowRight size={18}/> Hesabımı Oluştur
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        Zaten hesabın var mı? <Link to="/admin" className="text-indigo-600 hover:underline">Giriş yap</Link>
      </p>
    </div>
  )
}
