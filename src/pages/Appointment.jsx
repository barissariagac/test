import React, { useState } from 'react'
import { Calendar, Send, User, CheckCircle } from 'lucide-react'
import { addAppointment } from '../utils/store'

export default function Appointment() {
  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedTime, setSelectedTime] = useState(null)
  const [formData, setFormData] = useState({ name:'', email:'', message:'' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const availableTimes = ['10:00','11:30','14:00','15:30','17:00']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      alert('Lütfen tüm zorunlu alanları doldurun.'); return
    }
    setIsLoading(true)
    setTimeout(() => {
      addAppointment({
        date: selectedDate,
        time: selectedTime,
        ...formData,
      })
      setIsLoading(false)
      setIsSubmitted(true)
    }, 700)
  }

  if (isSubmitted) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-green-50 p-8 rounded-lg shadow-md text-center">
      <CheckCircle size={64} className="text-green-500 mb-4" />
      <h2 className="text-3xl font-bold text-green-700 mb-2">Randevu Talebiniz Alındı!</h2>
      <p className="text-gray-700">En kısa sürede sizinle iletişime geçeceğiz.</p>
      <p className="mt-4 text-sm text-gray-500">Tarih: <span className="font-medium">{selectedDate}</span></p>
      <p className="text-sm text-gray-500">Saat: <span className="font-medium">{selectedTime}</span></p>
      <button onClick={() => { setIsSubmitted(false); setSelectedTime(null); setFormData({ name:'', email:'', message:'' })}}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg">
        Yeni Randevu Oluştur
      </button>
    </div>
  )

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-center text-indigo-800 font-serif mb-2">Online Randevu</h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
        Aşağıdaki takvimden size uygun bir tarih ve saat seçin.
      </p>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <Calendar size={24}/> Tarih ve Saat
          </h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tarih</label>
            <input type="date" value={selectedDate} min={today}
              onChange={(e)=>{setSelectedDate(e.target.value); setSelectedTime(null)}}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Müsait Saatler</label>
            <div className="flex flex-wrap gap-2">
              {availableTimes.map(t=>(
                <button key={t} onClick={()=>setSelectedTime(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${selectedTime===t ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-100'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 p-6 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <User size={24}/> Bilgileriniz
          </h3>
          {['name','email'].map((f)=>(
            <div className="mb-4" key={f}>
              <label className="block text-gray-700 font-medium mb-2">
                {f==='name' ? 'Ad Soyad' : 'E-posta'}
              </label>
              <input type={f==='email'?'email':'text'} required
                value={formData[f]} onChange={(e)=>setFormData({...formData,[f]:e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          ))}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Randevu Notu (ops.)</label>
            <textarea rows="4" value={formData.message}
              onChange={(e)=>setFormData({...formData,message:e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <button type="submit" disabled={!selectedTime||isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors shadow-lg flex items-center justify-center gap-2 ${!selectedTime||isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
            <Send size={18}/> Randevu Talebi Gönder
          </button>
        </form>
      </div>
    </div>
  )
}
