import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiSearch, FiUser, FiHeart, FiShoppingBag, FiLogOut } from 'react-icons/fi'
import { supabase } from '../supabaseClient'

function Navbar({ session }) {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const handleAccountClick = () => {
    if (session) {
      setShowDropdown(!showDropdown)
    } else {
      navigate('/signup')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setShowDropdown(false)
    navigate('/')
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 h-16 flex items-center justify-between px-4 md:px-8 select-none">
      <button className="flex items-center gap-2 text-black hover:text-neutral-600 transition-colors cursor-pointer group">
        <FiMenu size={20} className="stroke-[2px]" />
        <span className="font-semibold text-sm tracking-wide">Menu</span>
      </button>

      <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <span className="text-2xl md:text-3xl font-black tracking-[0.1em] text-[#E30613] select-none font-sans">
          MAMMUT
        </span>
      </Link>

      <div className="flex items-center gap-5 md:gap-7">
        <button className="text-black hover:text-neutral-600 transition-colors cursor-pointer" aria-label="Search">
          <FiSearch size={22} className="stroke-[1.75px]" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={handleAccountClick}
            className={`text-black hover:text-neutral-600 transition-colors cursor-pointer relative ${session ? 'text-[#E30613]' : ''}`} 
            aria-label="Account"
          >
            <FiUser size={22} className="stroke-[1.75px]" />
            {session && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            )}
          </button>

          {showDropdown && session && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-neutral-200 shadow-xl rounded-none py-2 text-left z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2.5 border-b border-neutral-100">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Logged In As</p>
                <p className="text-xs text-neutral-800 font-medium truncate mt-0.5">{session.user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-600 hover:bg-neutral-50 transition-colors font-semibold uppercase tracking-wider text-left cursor-pointer"
              >
                <FiLogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>

        <button className="text-black hover:text-neutral-600 transition-colors cursor-pointer" aria-label="Favorites">
          <FiHeart size={22} className="stroke-[1.75px]" />
        </button>

        <button className="text-black hover:text-neutral-600 transition-colors cursor-pointer" aria-label="Cart">
          <FiShoppingBag size={22} className="stroke-[1.75px]" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
