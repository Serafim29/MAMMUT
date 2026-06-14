import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiSearch, FiUser, FiHeart, FiShoppingBag, FiLogOut, FiChevronDown, FiX } from 'react-icons/fi'
import { supabase } from '../supabaseClient'

function Navbar({ session }) {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const notices = [
    "Free socks with every footwear purchase",
    "Become part of Mammut Access and get 10% off",
    "Precautionary call for inspection"
  ]
  const [activeNotice, setActiveNotice] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
    if (isDrawerOpen) return
    const interval = setInterval(() => {
      setActiveNotice((prev) => (prev + 1) % notices.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isDrawerOpen])

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
    <header className="sticky top-0 z-50 w-full bg-white select-none">
      {isDrawerOpen && (
        <>
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
          />
          
          <div className="absolute top-0 left-0 w-full bg-[#E6DFD5] border-b border-black/10 z-50 text-black px-6 py-12 md:px-12 md:py-16 select-text animate-in slide-in-from-top duration-300 shadow-xl">
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="absolute top-6 right-6 text-black hover:text-neutral-700 cursor-pointer p-1"
              aria-label="Close promotion drawer"
            >
              <FiX size={24} className="stroke-[2px]" />
            </button>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 text-left">
              
              <div className="flex flex-col items-start text-xs md:text-sm font-sans">
                <h3 className="font-extrabold text-[13px] md:text-sm tracking-wider uppercase mb-5 font-display text-neutral-900 leading-snug">
                  Free socks with every footwear purchase
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  Purchase any footwear and we'll gift you a free pair of <strong className="font-bold text-black">Trail Running Targeted Cushion Crew Socks.</strong>
                </p>
                <a href="#" className="font-bold uppercase tracking-wider underline hover:text-neutral-700 mb-6 inline-block transition-colors">
                  Read T&C* ↗
                </a>
                <div className="text-neutral-700 space-y-1.5 mb-6">
                  <p className="font-semibold text-neutral-900 mb-1">Follow these steps to redeem the offer:</p>
                  <p>1. Add any full price footwear product to your cart.</p>
                  <p>2. Add one size of the free socks to your cart.</p>
                  <p>3. Enjoy your gift!</p>
                </div>
                <a href="#" className="font-bold uppercase tracking-wider underline hover:text-neutral-700 inline-block transition-colors">
                  Shop Footwear
                </a>
              </div>

              <div className="flex flex-col items-start text-xs md:text-sm font-sans">
                <h3 className="font-extrabold text-[13px] md:text-sm tracking-wider uppercase mb-5 font-display text-neutral-900 leading-snug">
                  Become part of Mammut Access and get 10% off
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  Our new loyalty program is here. Join now and receive a 10% welcome voucher.
                </p>
                <a href="#" className="font-bold uppercase tracking-wider underline hover:text-neutral-700 inline-block transition-colors">
                  Sign Up Now
                </a>
              </div>

              <div className="flex flex-col items-start text-xs md:text-sm font-sans">
                <h3 className="font-extrabold text-[13px] md:text-sm tracking-wider uppercase mb-5 font-display text-neutral-900 leading-snug">
                  Precautionary call for inspection
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  We have identified a potential issue with the closing mechanism of the carabiners used in the Skywalker Pro Via Ferrata and the Skywalker Pro Turn Via Ferrata Sets. We respectfully request that all consumers carefully inspect their Skywalker Pro and Skywalker Pro Turn Via Ferrata and return all potentially affected products for replacement.
                </p>
                <a href="#" className="font-bold uppercase tracking-wider underline hover:text-neutral-700 inline-block transition-colors">
                  Check your product now ↗
                </a>
              </div>

            </div>
          </div>
        </>
      )}

      <div 
        onClick={() => setIsDrawerOpen(true)}
        className="bg-[#E6DFD5] py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-black flex items-center justify-center gap-1 border-b border-black/5 cursor-pointer hover:bg-[#DCD5C9] transition-colors"
      >
        <span className="hover:underline hover:decoration-black">
          {notices[activeNotice]}
        </span>
        <FiChevronDown size={11} className="stroke-[2.5px] mt-0.5" />
      </div>

      <nav className="bg-white border-b border-neutral-200 h-16 flex items-center justify-between px-4 md:px-8 select-none relative">
        <button className="hidden md:flex items-center gap-2 text-black hover:text-neutral-600 transition-colors cursor-pointer group">
          <FiMenu size={20} className="stroke-[2px]" />
          <span className="font-semibold text-sm tracking-wide">Menu</span>
        </button>

        <Link 
          to="/" 
          className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center"
        >
          <span className="text-2xl md:text-3xl font-black tracking-[0.1em] text-[#E30613] select-none font-sans">
            MAMMUT
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-7 ml-auto z-10">
          <button className="text-black hover:text-neutral-600 transition-colors cursor-pointer" aria-label="Search">
            <FiSearch size={22} className="stroke-[1.75px]" />
          </button>

          <div className="hidden md:block relative" ref={dropdownRef}>
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

          <button className="flex md:hidden text-black hover:text-neutral-600 transition-colors cursor-pointer" aria-label="Menu">
            <FiMenu size={22} className="stroke-[2px]" />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
