import React from 'react'
import { Calendar, BookOpen, User, CheckCircle, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 px-4 bg-indigo-50 rounded-lg shadow-inner">
        <div className="h-32 w-32 mx-auto rounded-full bg-gray-200 mb-6 flex items-center justify-center overflow-hidden">
          <User size={64} className="text-gray-400" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-indigo-800 font-serif mb-2">Merhaba, ben İpek Vesek</h2>
        <p className="text-xl text-indigo-600 italic">Psikolog | Neuroscience MD</p>
        <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">
          Nörobilim alanında yüksek lisans eğitimimi tamamladım ve psikolojik değerlendirme, terapötik müdahaleler ile gönüllü projelerde kapsamlı bir deneyime sahibim...
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-indigo-800 mb-4 font-serif border-b pb-2">Çalışma Alanlarım</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          {[
            "Nöropsikolojik Testler ve Değerlendirme",
            "Bilişsel Davranışçı Terapi (BDT)",
            "Yetişkin ve Çocuk/Ergen Terapisi",
            "Travma ve Kriz Yönetimi",
            "Depremzedelere Yönelik Psikososyal Destek",
            "Aile ve Öğrenci Danışmanlığı",
          ].map((t)=> (
            <li key={t} className="flex items-start gap-2">
              <CheckCircle size={20} className="text-indigo-600 mt-1 flex-shrink-0" /> {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-indigo-100 p-8 rounded-lg shadow-md text-center">
        <h3 className="text-3xl font-bold text-indigo-800 mb-4 font-serif">Sizin İçin Buradayım</h3>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Zor zamanlarınızda yanınızda olmak...
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/appointment" className="flex items-center gap-2 bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105 shadow-xl">
            <Calendar size={24}/> Hemen Randevu Alın
          </Link>
          <Link to="/blog" className="flex items-center gap-2 bg-white text-indigo-600 font-bold text-lg px-8 py-4 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors transform hover:scale-105 shadow-xl">
            <BookOpen size={24}/> Blog Yazılarını Keşfedin
          </Link>
        </div>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-md text-center">
        <h3 className="text-3xl font-bold text-indigo-800 mb-4 font-serif border-b pb-2">İletişim</h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-left">
          <a href="mailto:ipekvesek@gmail.com" className="flex items-center gap-2 p-3 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors shadow-sm">
            <Mail size={20} className="text-indigo-600" /> ipekvesek@gmail.com
          </a>
          <a href="tel:+905427415037" className="flex items-center gap-2 p-3 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors shadow-sm">
            <Phone size={20} className="text-indigo-600" /> +90 542 741 50 37
          </a>
          <div className="flex items-center gap-2 p-3 bg-indigo-100 rounded-lg shadow-sm">
            <MapPin size={20} className="text-indigo-600" /> İstanbul, Türkiye
          </div>
        </div>
      </section>
    </div>
  )
}
