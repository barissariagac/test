const USERS_KEY = 'users_v1'
const CURRENT_KEY = 'current_user_v1'

function seedUsers() {
  if (!localStorage.getItem(USERS_KEY)) {
    const defaults = [
      { id: crypto.randomUUID(), username: 'admin', email: 'admin@local', password: '1234', role: 'admin', name: 'Yönetici', phone: '' },
      { id: crypto.randomUUID(), username: 'demo', email: 'demo@local', password: '1234', role: 'user', name: 'Demo Kullanıcı', phone: '' },
    ]
    localStorage.setItem(USERS_KEY, JSON.stringify(defaults))
  }
}
seedUsers()

function notifyAuth(){ try { window.dispatchEvent(new Event('auth:change')) } catch {} }

export function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') }
  catch { return [] }
}

export function addUser(user) {
  const users = getUsers()
  const exists = users.find(u => u.email === user.email || u.username === user.username)
  if (exists) throw new Error('Bu e-posta ya da kullanıcı adı zaten kayıtlı.')
  const withId = { id: crypto.randomUUID(), role: 'user', phone: '', ...user }
  users.push(withId)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  notifyAuth()
  return withId
}

export function updateUserProfile(patch) {
  const cu = currentUser()
  if (!cu) throw new Error('Giriş gerekli')
  const users = getUsers()
  const idx = users.findIndex(u => u.id === cu.id)
  if (idx === -1) throw new Error('Kullanıcı bulunamadı')
  users[idx] = { ...users[idx], ...patch }
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  const { id, email, role, name } = users[idx]
  localStorage.setItem(CURRENT_KEY, JSON.stringify({ id, email, role, name }))
  notifyAuth()
  return users[idx]
}

export function login(identifier, password) {
  const users = getUsers()
  const user = users.find(u => (u.username === identifier || u.email === identifier) && u.password === password)
  if (user) {
    const { id, email, role, name } = user
    localStorage.setItem(CURRENT_KEY, JSON.stringify({ id, email, role, name }))
    notifyAuth()
    return user
  }
  return null
}

export function logout() {
  localStorage.removeItem(CURRENT_KEY)
  notifyAuth()
}

export function isLoggedIn() {
  return !!localStorage.getItem(CURRENT_KEY)
}

export function currentUser() {
  try { return JSON.parse(localStorage.getItem(CURRENT_KEY) || 'null') }
  catch { return null }
}
