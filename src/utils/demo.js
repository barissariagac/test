import { getUsers, addUser } from './auth'
import { addAppointment, updateAppointment } from './store'
import { addPost, getPosts } from './blog'

// Seed only once
if (!localStorage.getItem('DEMO_SEEDED_V2')) {
  try {
    const users = getUsers()
    const indexByEmail = new Set(users.map(u => u.email))

    const demoUsers = [
      { username: 'ali',   email: 'ali@y.local',   password: '1234', role:'user', name:'Ali Yılmaz',    phone:'5321112233' },
      { username: 'ayse',  email: 'ayse@y.local',  password: '1234', role:'user', name:'Ayşe Demir',    phone:'5442223344' },
      { username: 'zeynep',email: 'zeynep@y.local',password: '1234', role:'user', name:'Zeynep Kaya',   phone:'5553334455' },
      { username: 'berk',  email: 'berk@y.local',  password: '1234', role:'user', name:'Berk Can',      phone:'5334445566' },
      { username: 'celal', email: 'celal@y.local', password: '1234', role:'user', name:'Celal Öz',      phone:'5345556677' },
    ]

    const ensured = []
    for (const u of demoUsers) {
      if (!indexByEmail.has(u.email)) {
        try { ensured.push(addUser(u)) } catch {}
      }
    }

    // Appointments for a subset (with different statuses)
    const appts = [
      { email:'ali@y.local',   name:'Ali Yılmaz',    date:offset(1),  time:'10:00', status:'confirmed', message:'İlk görüşme' },
      { email:'ali@y.local',   name:'Ali Yılmaz',    date:offset(14), time:'11:30', status:'pending',   message:'Kontrol' },
      { email:'ayse@y.local',  name:'Ayşe Demir',    date:offset(0),  time:'15:30', status:'canceled',  message:'Uygun olamayabilirim' },
      { email:'zeynep@y.local',name:'Zeynep Kaya',   date:offset(3),  time:'14:00', status:'confirmed', message:'' },
      { email:'berk@y.local',  name:'Berk Can',      date:offset(7),  time:'17:00', status:'pending',   message:'Dönüş rica ederim' },
    ]

    for (const a of appts) {
      const created = addAppointment({ date:a.date, time:a.time, name:a.name, email:a.email, message:a.message })
      try { updateAppointment(created.id, { status: a.status }) } catch {}
    }

    // Extra demo blog post if list < 3
    const posts = getPosts()
    if (posts.length < 4) {
      addPost({ title:'Prototipte Sık Görülen Sorular', date:new Date().toISOString().slice(0,10), summary:'Randevu akışı ve ilk seans hakkında kısa notlar.', content:'' })
    }

    localStorage.setItem('DEMO_SEEDED_V2', '1')
  } catch (e) {
    console.warn('Demo seed failed', e)
  }
}

function offset(days){
  const d = new Date()
  d.setDate(d.getDate()+days)
  return d.toISOString().slice(0,10)
}
