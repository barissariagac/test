import React, { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { getPosts } from '../utils/blog'

export default function Blog() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{ setPosts(getPosts()) },[])

  return (
    <div className="space-y-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-center text-indigo-800 font-serif">Blog</h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto">
        Psikoloji ve nörobilim alanındaki güncel konular, araştırmalar ve pratik bilgiler.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(p=>(
          <div key={p.id} className="bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">{p.title}</h3>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
              <Clock size={16}/> {new Date(p.date).toLocaleDateString('tr-TR')}
            </p>
            <p className="text-gray-700">{p.summary}</p>
          </div>
        ))}
        {posts.length===0 && (
          <div className="text-center text-gray-500">Henüz yazı yok.</div>
        )}
      </div>
    </div>
  )
}
