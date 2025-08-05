import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn, logout } from '../utils/auth'
import { getAppointments, updateAppointment, removeAppointment } from '../utils/store'
import { CheckCircle, XCircle, Trash2, LogOut } from 'lucide-react'

export default function Dashboard(){
  const nav = useNavigate()
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('upcoming') // all | today | upcoming

  useEffect(()=>{
    if(!isLoggedIn()) nav('/admin')
    else setItems(getAppointments())
  },[nav])

  const filtered = items.filter(a=>{
    if (filter==='all') return true
    const today = new Date().toISOString().split('T')[0]
    if (filter==='today') return a.date===today
    return a.date>=today
  })

  const setStatus=(id, status)=>{
    updateAppointment(id,{status})
    setItems(getAppointments())
  }
  const del=(id)=>{
    if(confirm('Silinsin mi?')) { removeAppointment(id); setItems(getAppointments()) }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Randevu Listesi</h2>
        <button onClick={()=>{logout(); nav('/admin')}} className="flex items-center gap-2 text-gray-600 hover:text-red-600">
          <LogOut size={18}/> Çıkış
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {['upcoming','today','all'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`px-3 py-2 rounded border ${filter===f?'bg-indigo-600 text-white':'bg-white text-gray-700 hover:bg-indigo-50'}`}>
            {f==='upcoming'?'Yaklaşanlar':f==='today'?'Bugün':'Tümü'}
          </button>
        ))}
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Tarih</th>
              <th className="p-2">Saat</th>
              <th className="p-2">Ad</th>
              <th className="p-2">E-posta</th>
              <th className="p-2">Durum</th>
              <th className="p-2">Not</th>
              <th className="p-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length===0 && (
              <tr><td colSpan="7" className="p-4 text-center text-gray-500">Kayıt yok.</td></tr>
            )}
            {filtered.map(a=>(
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{a.date}</td>
                <td className="p-2">{a.time}</td>
                <td className="p-2">{a.name}</td>
                <td className="p-2">{a.email}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    a.status==='pending' ? 'bg-yellow-100 text-yellow-800' :
                    a.status==='confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>{a.status}</span>
                </td>
                <td className="p-2 max-w-[240px] truncate" title={a.message}>{a.message||'-'}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button title="Onayla" onClick={()=>setStatus(a.id,'confirmed')} className="p-2 rounded bg-green-50 hover:bg-green-100">
                      <CheckCircle size={16}/>
                    </button>
                    <button title="İptal" onClick={()=>setStatus(a.id,'canceled')} className="p-2 rounded bg-yellow-50 hover:bg-yellow-100">
                      <XCircle size={16}/>
                    </button>
                    <button title="Sil" onClick={()=>del(a.id)} className="p-2 rounded bg-red-50 hover:bg-red-100">
                      <Trash2 size={16}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
