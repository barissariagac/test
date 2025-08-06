import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn, currentUser } from '../utils/auth'
import { getPosts, addPost, updatePost, removePost } from '../utils/blog'
import { Plus, Trash2, Save, Edit3 } from 'lucide-react'

export default function BlogAdmin(){
  const nav = useNavigate()
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title:'', date: new Date().toISOString().slice(0,10), summary:'', content:'' })
  const me = currentUser()

  useEffect(()=>{
    if(!isLoggedIn()) { nav('/admin'); return }
    setItems(getPosts())
  }, [nav])

  const submit=(e)=>{
    e.preventDefault()
    if (!form.title || !form.date) return
    if (editing) {
      updatePost(editing, form)
    } else {
      addPost({ ...form, authorEmail: me?.email || 'admin@local' })
    }
    setItems(getPosts())
    setForm({ title:'', date: new Date().toISOString().slice(0,10), summary:'', content:'' })
    setEditing(null)
  }

  const del=(id)=>{
    if (confirm('Silinsin mi?')) {
      removePost(id)
      setItems(getPosts())
    }
  }

  const edit=(p)=>{
    setEditing(p.id)
    setForm({ title: p.title, date: p.date, summary: p.summary || '', content: p.content || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold">Blog Yönetimi</h2>

      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 items-start">
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Başlık</label>
            <input className="w-full p-3 border rounded" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tarih</label>
            <input type="date" className="w-full p-3 border rounded" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Özet</label>
            <textarea rows="4" className="w-full p-3 border rounded" value={form.summary} onChange={e=>setForm({...form, summary:e.target.value})}/>
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 flex items-center gap-2 justify-center">
            {editing ? <><Save size={18}/> Güncelle</> : <><Plus size={18}/> Ekle</>}
          </button>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">İçerik (opsiyonel)</label>
          <textarea rows="12" className="w-full p-3 border rounded" value={form.content} onChange={e=>setForm({...form, content:e.target.value})}/>
        </div>
      </form>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Başlık</th>
              <th className="p-2">Tarih</th>
              <th className="p-2">Özet</th>
              <th className="p-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {items.length===0 && <tr><td colSpan="4" className="p-4 text-center text-gray-500">Yazı yok.</td></tr>}
            {items.map(p=>(
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{p.title}</td>
                <td className="p-2">{new Date(p.date).toLocaleDateString('tr-TR')}</td>
                <td className="p-2 max-w-[340px] truncate" title={p.summary}>{p.summary}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button title="Düzenle" onClick={()=>edit(p)} className="p-2 rounded bg-yellow-50 hover:bg-yellow-100"><Edit3 size={16}/></button>
                    <button title="Sil" onClick={()=>del(p.id)} className="p-2 rounded bg-red-50 hover:bg-red-100"><Trash2 size={16}/></button>
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
