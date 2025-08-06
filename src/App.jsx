import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Appointment from './pages/Appointment'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import BlogAdmin from './admin/BlogAdmin'
import Account from './pages/Account'
import MyAppointments from './pages/MyAppointments'
import Signup from './pages/Signup'
import { isLoggedIn, currentUser } from './utils/auth'

const RequireAuth = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/admin" replace />
}
const RequireAdmin = ({ children }) => {
  const me = currentUser()
  return me && me.role === 'admin' ? children : <Navigate to="/admin" replace />
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/dashboard" element={
            <RequireAuth><RequireAdmin><Dashboard /></RequireAdmin></RequireAuth>
          } />
          <Route path="/admin/blog" element={
            <RequireAuth><RequireAdmin><BlogAdmin /></RequireAdmin></RequireAuth>
          } />
          <Route path="/account" element={
            <RequireAuth><Account /></RequireAuth>
          } />
          <Route path="/my" element={
            <RequireAuth><MyAppointments /></RequireAuth>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
