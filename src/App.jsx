import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Category from './pages/Category.jsx'
import Saved from './pages/Saved.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Profile from './pages/Profile.jsx'
import { FavoritesProvider } from './context/FavoritesContext'
import { CartProvider } from './context/CartContext'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <CartProvider session={session}>
      <FavoritesProvider session={session}>
        <Router>
          <Routes>
            <Route path="/" element={<Home session={session} />} />
            <Route path="/signup" element={<SignUp session={session} />} />
            <Route path="/category/:slug" element={<Category session={session} />} />
            <Route path="/saved" element={<Saved session={session} />} />
            <Route path="/product/:id" element={<ProductDetails session={session} />} />
            <Route path="/cart" element={<Cart session={session} />} />
            <Route path="/profile" element={session ? <Profile session={session} /> : <Navigate to="/signup" replace />} />
            <Route path="/account" element={<Navigate to="/profile" replace />} />
            <Route path="/favorites" element={<Navigate to="/saved" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  )
}

export default App

