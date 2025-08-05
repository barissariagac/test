const KEY = 'appointments_v1'

export function getAppointments() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
  catch { return [] }
}

export function addAppointment(appt) {
  const arr = getAppointments()
  const withId = {
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...appt,
  }
  arr.push(withId)
  localStorage.setItem(KEY, JSON.stringify(arr))
  return withId
}

export function updateAppointment(id, patch) {
  const arr = getAppointments()
  const idx = arr.findIndex(a => a.id === id)
  if (idx >= 0) {
    arr[idx] = { ...arr[idx], ...patch }
    localStorage.setItem(KEY, JSON.stringify(arr))
  }
}

export function removeAppointment(id) {
  const arr = getAppointments().filter(a => a.id !== id)
  localStorage.setItem(KEY, JSON.stringify(arr))
}
