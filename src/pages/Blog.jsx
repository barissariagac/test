import React from 'react'
import { Clock } from 'lucide-react'

export default function Blog() {
  const posts = [
    { id:1, title:"Nörobilim Işığında Zihinsel Sağlık", date:"14 Mart 2025", summary:"Psikolojinin temelini oluşturan nörobilim alanındaki son gelişmeleri ve zihinsel sağlık üzerindeki etkilerini inceleyen bir makale." },
    { id:2, title:"Travma Sonrası Stres Bozukluğu (TSSB) ile Başa Çıkma Yolları", date:"05 Şubat 2025", summary:"Travma sonrası iyileşme sürecinde bireylere yardımcı olabilecek terapi yaklaşımları ve psikolojik destek yöntemleri üzerine bir rehber." },
    { id:3, title:"Çocuk Değerlendirme Testleri: Ebeveynler İçin Kılavuz", date:"20 Ocak 2025", summary:"Çocuk ve ergenlerde kullanılan psikolojik değerlendirme ve dikkat testleri hakkında merak edilenler ve testlerin önemi." },
  ]
  return (
    <div className="space-y-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-center text-indigo-800 font-serif">Blog</h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto">
        Psikoloji ve nörobilim alanındaki güncel konular, araştırmalar ve pratik bilgiler içeren makalelerimi buradan okuyabilirsiniz.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(p=>(
          <div key={p.id} className="bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">{p.title}</h3>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
              <Clock size={16}/> {p.date}
            </p>
            <p className="text-gray-700">{p.summary}</p>
            <a href="#" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">Devamını Oku →</a>
          </div>
        ))}
      </div>
    </div>
  )
}
