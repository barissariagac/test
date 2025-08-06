import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, addUser } from '../utils/auth'
import { Shield, UserPlus } from 'lucide-react'

export default function Login(){
  const [identifier,setIdentifier]=useState('')
  const [p,setP]=useState('')
  const [err,setErr]=useState('')
  const nav=useNavigate()

  const submit=(e)=>{
    e.preventDefault()
    const u = login(identifier, p)
    if (u) {
      if (u.role === 'admin') nav('/admin/dashboard')
      else nav('/my')
    } else setErr('Bilgiler hatalı. (admin/1234 ya da demo/1234 deneyebilirsin)')
  }

  const quickSignup = async () => {
    try {
      const email = prompt('E-posta:')
      const username = prompt('Kullanıcı adı:')
      const password = prompt('Şifre:')
      if (!email || !username || !password) return
      addUser({ email, username, password, name: username })
      alert('Kayıt başarılı. Şimdi giriş yapabilirsiniz.')
    } catch (e) {
      alert(e.message || 'Kayıt sırasında hata.')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><Shield/> Giriş</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-3 border rounded" placeholder="E-posta veya Kullanıcı adı" value={identifier} onChange={e=>setIdentifier(e.target.value)}/>
        <input className="w-full p-3 border rounded" type="password" placeholder="Şifre" value={p} onChange={e=>setP(e.target.value)}/>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">Giriş Yap</button>
      </form>
      <button onClick={quickSignup} className="mt-4 w-full border py-3 rounded hover:bg-gray-50 flex items-center gap-2 justify-center">
        <UserPlus size={18}/> Hızlı Kayıt (prototip)
      </button>
      <p className="text-sm text-gray-600 mt-4">Hesabın yok mu? <Link to="/signup" className="text-indigo-600 hover:underline">Kayıt ol</Link></p>
      <p className="text-xs text-gray-500 mt-2">Demo hesaplar: admin/1234 (admin), demo/1234 (kullanıcı)</p>
    </div>
  )
}
