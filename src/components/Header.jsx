import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calendar, BookOpen, User, Shield } from 'lucide-react'
import { currentUser } from '../utils/auth'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const [me, setMe] = useState(null)

  useEffect(()=>{ setMe(currentUser()) },[])

  useEffect(()=>{
    const h = () => setMe(currentUser())
    window.addEventListener('auth:change', h)
    window.addEventListener('storage', h)
    return () => { window.removeEventListener('auth:change', h); window.removeEventListener('storage', h) }
  }, [])

  useEffect(()=>{ setMe(currentUser()) }, [pathname])

  const NavBtn = ({ to, children, primary }) => (
    <Link
      to={to}
      className={
        primary
          ? "bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2"
          : `text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-2 ${pathname===to?'text-indigo-700':''}`
      }
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </Link>
  )

  const AccountLink = () => (
    me?.role === 'admin'
      ? <NavBtn to="/admin/dashboard"><Shield size={18}/> Admin</NavBtn>
      : me
        ? <NavBtn to="/my"><User size={18}/> Hesabım</NavBtn>
        : (<>
            <NavBtn to="/admin"><User size={18}/> Giriş</NavBtn>
            <NavBtn to="/signup"><User size={18}/> Kayıt Ol</NavBtn>
          </>)
  )

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700 font-serif">İpek Vesek</h1>
        <nav className="hidden md:flex space-x-6">
          <NavBtn to="/"><User size={18}/> Ana Sayfa</NavBtn>
          <NavBtn to="/blog"><BookOpen size={18}/> Blog</NavBtn>
          <NavBtn to="/appointment" primary><Calendar size={18}/> Online Randevu</NavBtn>
          <AccountLink />
        </nav>
        <button className="md:hidden text-gray-600" onClick={()=>setIsMenuOpen(!isMenuOpen)}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <nav className="flex flex-col p-4 space-y-2">
            <NavBtn to="/"><User size={18}/> Ana Sayfa</NavBtn>
            <NavBtn to="/blog"><BookOpen size={18}/> Blog</NavBtn>
            <NavBtn to="/appointment" primary><Calendar size={18}/> Online Randevu</NavBtn>
            <AccountLink />
          </nav>
        </div>
      )}
    </header>
  )
}
