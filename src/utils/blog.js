const KEY = 'blogs_v1'

function seed() {
  if (!localStorage.getItem(KEY)) {
    const defaults = [
      { id: crypto.randomUUID(), title: "Nörobilim Işığında Zihinsel Sağlık", date: "2025-03-14", summary: "Nörobilimdeki güncel bulguların zihinsel sağlık üzerindeki etkileri.", content: "", authorEmail: "admin@local" },
      { id: crypto.randomUUID(), title: "TSSB ile Başa Çıkma Yolları", date: "2025-02-05", summary: "Travma sonrası süreçte uygulanabilecek terapi ve destek yöntemleri.", content: "", authorEmail: "admin@local" },
      { id: crypto.randomUUID(), title: "Çocuk Değerlendirme Testleri", date: "2025-01-20", summary: "Ebeveynler için temel psikolojik testlere kısa bir bakış.", content: "", authorEmail: "admin@local" },
    ]
    localStorage.setItem(KEY, JSON.stringify(defaults))
  }
}
seed()

export function getPosts() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
  catch { return [] }
}

export function addPost(post) {
  const arr = getPosts()
  const withId = { id: crypto.randomUUID(), ...post }
  arr.unshift(withId)
  localStorage.setItem(KEY, JSON.stringify(arr))
  return withId
}

export function updatePost(id, patch) {
  const arr = getPosts()
  const idx = arr.findIndex(p => p.id === id)
  if (idx >= 0) {
    arr[idx] = { ...arr[idx], ...patch }
    localStorage.setItem(KEY, JSON.stringify(arr))
  }
}

export function removePost(id) {
  const arr = getPosts().filter(p => p.id !== id)
  localStorage.setItem(KEY, JSON.stringify(arr))
}
