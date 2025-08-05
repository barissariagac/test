const ADMIN_FLAG = 'is_admin_logged_in'
const ADMIN_USER = 'admin'
const ADMIN_PASS = '1234' // prototip - yayın öncesi mutlaka değiştirin

export function login(u, p) {
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    localStorage.setItem(ADMIN_FLAG, 'true')
    return true
  }
  return false
}

export function logout() {
  localStorage.removeItem(ADMIN_FLAG)
}

export function isLoggedIn() {
  return localStorage.getItem(ADMIN_FLAG) === 'true'
}
