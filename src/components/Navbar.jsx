import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiSearch, FiUser, FiHeart, FiShoppingBag, FiLogOut, FiChevronDown, FiX, FiChevronRight } from 'react-icons/fi'
import { supabase } from '../supabaseClient'
import { JacketIcon, HoodieIcon, PantsIcon, CapIcon, HikingShoesIcon, MountaineeringBootsIcon, TrailRunningShoesIcon, EverydayShoesIcon, ApproachShoesIcon, BackpackIcon, AvalancheIcon, ClimbingIcon, SleepingBagIcon, AccessoriesIcon } from './MenuIcons'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'

function Navbar({ session }) {
  const { favorites } = useFavorites()
  const { cartCount } = useCart()
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
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [activeGender, setActiveGender] = useState('all')
  const [hoveredCategory, setHoveredCategory] = useState(null)

  const menuCategories = [
    {
      name: 'Clothing',
      hasSubmenu: true,
      submenuItems: [
        { name: 'Discover all', icon: null },
        { name: 'Jackets & Vests', icon: 'jacket' },
        { name: 'Tops', icon: 'hoodie' },
        { name: 'Pants & Shorts', icon: 'pants' },
        { name: 'Accessories', icon: 'cap' }
      ]
    },
    {
      name: 'Footwear',
      hasSubmenu: true,
      submenuItems: [
        { name: 'Discover all', icon: null },
        { name: 'Hiking Shoes', icon: 'hiking_shoes' },
        { name: 'Mountaineering Boots', icon: 'mountaineering_boots' },
        { name: 'Trail Running Shoes', icon: 'trail_running_shoes' },
        { name: 'Everyday Shoes', icon: 'everyday_shoes' },
        { name: 'Approach Shoes', icon: 'approach_shoes' }
      ]
    },
    {
      name: 'Equipment',
      hasSubmenu: true,
      submenuItems: [
        { name: 'Discover all', icon: null },
        { name: 'Backpacks & Bags', icon: 'backpack' },
        { name: 'Avalanche Equipment', icon: 'avalanche' },
        { name: 'Climbing Equipment', icon: 'climbing' },
        { name: 'Sleeping Bags', icon: 'sleeping_bag' },
        { name: 'Equipment Accessories', icon: 'eq_accessories' }
      ]
    },
    {
      name: 'Outlet',
      hasSubmenu: false,
      isHighlighted: true
    },
    {
      name: 'Shop by Activity',
      hasSubmenu: true,
      submenuItems: [
        { name: 'Hiking', icon: null },
        { name: 'Climbing', icon: null },
        { name: 'Mountaineering', icon: null },
        { name: 'Snowsports', icon: null },
        { name: 'Everyday', icon: null },
        { name: 'Trail Running', icon: null },
        { name: 'Travel', icon: null }
      ]
    },
    {
      name: 'Collections',
      hasSubmenu: true,
      submenuItems: [
        { name: 'Hiking Patrol + Mammut', icon: null },
        { name: 'Mountain Pro', icon: null },
        { name: 'New Arrivals', icon: null },
        { name: 'Color of the season', icon: null },
        { name: 'Bestseller', icon: null },
        { name: 'Eiger Extreme', icon: null }
      ]
    },
    {
      name: 'Explore Mammut',
      hasSubmenu: true,
      submenuItems: [
        { name: 'Take a hike', icon: null },
        { name: 'About us', icon: null },
        { name: 'Responsibility', icon: null },
        { name: 'Our Athletes', icon: null },
        { name: 'Stories & Guides', icon: null },
        { name: 'Mammut Mountain School Switzerland', icon: null },
        { name: 'Repair & Care', icon: null },
        { name: 'Technologies', icon: null },
        { name: 'Jacket Finder', icon: null }
      ]
    },
    {
      name: 'Loyalty Program',
      hasSubmenu: false
    }
  ]

  const renderSubmenuIcon = (iconName) => {
    switch (iconName) {
      case 'jacket': return <JacketIcon />
      case 'hoodie': return <HoodieIcon />
      case 'pants': return <PantsIcon />
      case 'cap': return <CapIcon />
      case 'hiking_shoes': return <HikingShoesIcon />
      case 'mountaineering_boots': return <MountaineeringBootsIcon />
      case 'trail_running_shoes': return <TrailRunningShoesIcon />
      case 'everyday_shoes': return <EverydayShoesIcon />
      case 'approach_shoes': return <ApproachShoesIcon />
      case 'backpack': return <BackpackIcon />
      case 'avalanche': return <AvalancheIcon />
      case 'climbing': return <ClimbingIcon />
      case 'sleeping_bag': return <SleepingBagIcon />
      case 'eq_accessories': return <AccessoriesIcon />
      default: return null
    }
  }

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

      {isNavMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div 
            onClick={() => {
              setIsNavMenuOpen(false)
              setHoveredCategory(null)
            }}
            className="fixed inset-0 bg-black/60 transition-opacity duration-300 animate-in fade-in duration-300 z-0"
          />
          
          <div 
            onMouseLeave={() => {
              setIsNavMenuOpen(false)
              setHoveredCategory(null)
            }}
            className="relative h-full bg-white flex shadow-2xl transition-all duration-300 animate-in slide-in-from-left duration-300 z-10"
          >
            <div className="w-[375px] h-full bg-white flex flex-col p-[20px] pt-[80px] relative z-10 border-r border-neutral-100 flex-shrink-0">
              <button 
                onClick={() => {
                  setIsNavMenuOpen(false)
                  setHoveredCategory(null)
                }}
                className="absolute top-[20px] left-[20px] text-black hover:text-neutral-600 cursor-pointer p-1"
                aria-label="Close menu"
              >
                <FiX size={24} className="stroke-[2.5px]" />
              </button>
              
              <div className="flex gap-2 w-full mt-4">
                <button 
                  onClick={() => setActiveGender('all')}
                  className={`flex-1 text-center py-2 px-3 text-xs tracking-wider uppercase font-semibold border transition-all cursor-pointer ${
                    activeGender === 'all' 
                      ? 'border-black text-black font-bold' 
                      : 'border-neutral-200 text-neutral-400 hover:text-black hover:border-black'
                  }`}
                >
                  All genders
                </button>
                <button 
                  onClick={() => setActiveGender('men')}
                  className={`flex-1 text-center py-2 px-3 text-xs tracking-wider uppercase font-semibold border transition-all cursor-pointer ${
                    activeGender === 'men' 
                      ? 'border-black text-black font-bold' 
                      : 'border-neutral-200 text-neutral-400 hover:text-black hover:border-black'
                  }`}
                >
                  Men
                </button>
                <button 
                  onClick={() => setActiveGender('women')}
                  className={`flex-1 text-center py-2 px-3 text-xs tracking-wider uppercase font-semibold border transition-all cursor-pointer ${
                    activeGender === 'women' 
                      ? 'border-black text-black font-bold' 
                      : 'border-neutral-200 text-neutral-400 hover:text-black hover:border-black'
                  }`}
                >
                  Women
                </button>
              </div>

              <div className="mt-8 flex-1 flex flex-col gap-0 overflow-y-auto pr-1">
                {menuCategories.map((category) => {
                  const isHovered = hoveredCategory?.name === category.name
                  return (
                    <div
                      key={category.name}
                      onMouseEnter={() => {
                        if (category.hasSubmenu) {
                          setHoveredCategory(category)
                        } else {
                          setHoveredCategory(null)
                        }
                      }}
                      className="h-[60px] flex items-center justify-between cursor-pointer group/item select-none transition-colors duration-150"
                    >
                      {category.isHighlighted ? (
                        <div className="flex items-center">
                          <span className="inline-block bg-[#C5FF00] px-3.5 py-1 text-black font-extrabold text-[19px] tracking-tight transform skew-x-[-12deg] italic select-none">
                            {category.name}
                          </span>
                        </div>
                      ) : (
                        <span className={`text-[19px] font-semibold tracking-wide transition-all duration-150 ${
                          isHovered 
                            ? 'text-[#E30613] italic translate-x-1.5' 
                            : 'text-black'
                        }`}>
                          {category.name}
                        </span>
                      )}
                      
                      {category.hasSubmenu && (
                        <FiChevronRight 
                          size={18} 
                          className={`transition-colors duration-150 ${
                            isHovered ? 'text-[#E30613]' : 'text-black'
                          }`} 
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-auto pt-6 flex flex-col gap-4">
                <Link 
                  to="/account" 
                  onClick={() => setIsNavMenuOpen(false)}
                  className="text-[19px] font-semibold text-black hover:text-[#E30613] transition-colors"
                >
                  Account
                </Link>
                <Link 
                  to="/help" 
                  onClick={() => setIsNavMenuOpen(false)}
                  className="text-[19px] font-semibold text-black hover:text-[#E30613] transition-colors"
                >
                  Help Center
                </Link>
              </div>
            </div>

            {hoveredCategory && hoveredCategory.hasSubmenu && (
              <div className="absolute inset-0 md:relative md:inset-auto md:w-[375px] md:h-full bg-[#F5F5F3] border-l border-neutral-200/50 flex flex-col p-[24px] pt-[80px] z-20 shadow-xl md:shadow-none animate-in slide-in-from-left-4 duration-300 flex-shrink-0">
                <button 
                  onClick={() => setHoveredCategory(null)}
                  className="flex md:hidden items-center gap-1.5 text-xs uppercase font-extrabold tracking-widest text-[#E30613] hover:underline mb-6"
                >
                  ← Back
                </button>
                
                <div className="flex flex-col gap-0 overflow-y-auto">
                  {hoveredCategory.submenuItems.map((item) => (
                    <div 
                      key={item.name}
                      className="h-[44px] flex items-center justify-between cursor-pointer group/sub select-none hover:text-[#E30613] transition-colors"
                    >
                      <span className="text-[16px] font-medium text-black group-hover/sub:text-[#E30613] transition-colors">
                        {item.name}
                      </span>
                      {item.icon && (
                        <div className="flex-shrink-0 opacity-90 transition-transform group-hover/sub:scale-105 duration-200">
                          {renderSubmenuIcon(item.icon)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <nav className="bg-white border-b border-neutral-200 h-16 flex items-center justify-between px-4 md:px-8 select-none relative">
        <button 
          onMouseEnter={() => setIsNavMenuOpen(true)}
          onClick={() => setIsNavMenuOpen(true)}
          className="hidden md:flex items-center gap-2 text-black hover:text-[#E30613] transition-colors cursor-pointer group"
        >
          <FiMenu size={20} className="stroke-[2px] transition-transform duration-150 group-hover:scale-105" />
          <span className="font-semibold text-sm tracking-wide transition-all duration-150 group-hover:italic group-hover:translate-x-1 group-hover:text-[#E30613]">
            Menu
          </span>
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

          <Link 
            to="/saved"
            className="text-black hover:text-neutral-600 transition-colors cursor-pointer relative flex items-center justify-center" 
            aria-label="Favorites"
          >
            <FiHeart 
              size={22} 
              className={`stroke-[1.75px] ${favorites.length > 0 ? 'fill-[#E30613] stroke-[#E30613]' : ''}`} 
            />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#E30613] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link 
            to="/cart"
            className="text-black hover:text-neutral-600 transition-colors cursor-pointer relative flex items-center justify-center" 
            aria-label="Cart"
          >
            <FiShoppingBag size={22} className="stroke-[1.75px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#E30613] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white animate-in zoom-in duration-200">
                {cartCount}
              </span>
            )}
          </Link>

          <button 
            onClick={() => setIsNavMenuOpen(true)}
            className="flex md:hidden text-black hover:text-neutral-600 transition-colors cursor-pointer" 
            aria-label="Menu"
          >
            <FiMenu size={22} className="stroke-[2px]" />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
