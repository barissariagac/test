import React from 'react'
export default function Footer() {
  return (
    <footer className="bg-gray-100 p-8 text-center text-gray-600 mt-12">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} İpek Vesek. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  )
}
