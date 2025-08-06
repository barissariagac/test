import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { currentUser, logout } from '../utils/auth'
import { getAppointments } from '../utils/store'
import Appointment from './Appointment'
import { RefreshCcw, Calendar, Clock, LogOut } from 'lucide-react'

export default function MyAppointments(){
  const me = currentUser()
  const nav = useNavigate()
  const [items, setItems] = useState([])

  const load = useCallback(()=>{
    const all = getAppointments()
    const mine = me?.email ? all.filter(a => a.email === me.email) : []
    mine.sort((a,b) => (b.createdAt||'').localeCompare(a.createdAt||''))
    setItems(mine)
  }, [me])

  useEffect(()=>{ load() }, [load])

  return (
    <>
      {/* top header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">{me?.name ? `Merhaba, ${me.name}` : 'Randevularım'}</div>
        <button onClick={()=>{ logout(); nav('/admin') }} className="px-3 py-2 rounded border hover:bg-red-50 flex items-center gap-2 text-sm">
          <LogOut size={16}/> Çıkış
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold flex items-center gap-2"><Clock size={18}/> Randevularım</h2>
          <button onClick={load} className="px-3 py-2 rounded border hover:bg-indigo-50 flex items-center gap-2 text-sm">
            <RefreshCcw size={14}/> Yenile
          </button>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Tarih</th>
                <th className="p-2">Saat</th>
                <th className="p-2">Durum</th>
                <th className="p-2">Not</th>
              </tr>
            </thead>
            <tbody>
              {items.length===0 && <tr><td colSpan="4" className="p-4 text-center text-gray-500">Henüz randevu yok.</td></tr>}
              {items.map(a => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{a.date}</td>
                  <td className="p-2">{a.time}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      a.status==='pending' ? 'bg-yellow-100 text-yellow-800' :
                      a.status==='confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>{a.status}</span>
                  </td>
                  <td className="p-2 max-w-[240px] truncate" title={a.message}>{a.message||'-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2"><Calendar size={18}/> Yeni Randevu</h2>
        <Appointment onBooked={load} />
      </div>
      </div>
    </>
  )
}
