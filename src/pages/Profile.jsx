import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight, FiLogOut, FiChevronDown } from 'react-icons/fi'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useFavorites } from '../context/FavoritesContext'
import settingProfileImg from '../assets/Setting_Profile.png'

import DashboardTab from '../components/profile/DashboardTab'
import OrdersTab from '../components/profile/OrdersTab'
import WishlistTab from '../components/profile/WishlistTab'
import LoyaltyTab from '../components/profile/LoyaltyTab'
import ReferralTab from '../components/profile/ReferralTab'
import SettingsTab from '../components/profile/SettingsTab'

function Profile({ session }) {
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [copySuccess, setCopySuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const [email, setEmail] = useState(session?.user?.email || '')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dob, setDob] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('Belgium')
  const [zipCode, setZipCode] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [apartment, setApartment] = useState('')
  
  const [newsletter, setNewsletter] = useState(true)
  const [loyaltyNews, setLoyaltyNews] = useState(true)
  const [printedBrochures, setPrintedBrochures] = useState(true)
  const [gearPreference, setGearPreference] = useState('men')
  const [activities, setActivities] = useState({
    hiking: false,
    trailRunning: false,
    snowsports: false,
    climbing: false,
    mountaineering: false,
    travel: false,
    everyday: false,
    viaFerrata: false
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  useEffect(() => {
    if (session?.user) {
      const meta = session.user.user_metadata || {}
      setFirstName(meta.first_name || '')
      setMiddleName(meta.middle_name || '')
      setLastName(meta.last_name || '')
      setPhoneNumber(meta.phone_number || '')
      setDob(meta.dob || '6/9/2004') 
      setState(meta.state || '')
      setCountry(meta.country || 'Belgium')
      setZipCode(meta.zip_code || '')
      setCity(meta.city || '')
      setStreet(meta.street || '')
      setApartment(meta.apartment || '')
      setEmail(session.user.email || '')
      
      setNewsletter(meta.newsletter !== undefined ? meta.newsletter : true)
      setLoyaltyNews(meta.loyalty_news !== undefined ? meta.loyalty_news : true)
      setPrintedBrochures(meta.printed_brochures !== undefined ? meta.printed_brochures : true)
      setGearPreference(meta.gear_preference || 'men')
      
      const act = meta.activities || {}
      setActivities({
        hiking: act.hiking || false,
        trailRunning: act.trailRunning || false,
        snowsports: act.snowsports || false,
        climbing: act.climbing || false,
        mountaineering: act.mountaineering || false,
        travel: act.travel || false,
        everyday: act.everyday || false,
        viaFerrata: act.viaFerrata || false
      })
    }
  }, [session])

  const getMemberSince = () => {
    if (session?.user?.created_at) {
      try {
        const d = new Date(session.user.created_at)
        const monthName = d.toLocaleString('en-US', { month: 'long' })
        const year = d.getFullYear()
        return `Member since ${monthName} ${year}`
      } catch (e) {
        return 'Member since June 2026'
      }
    }
    return 'Member since June 2026'
  }

  const handleSaveSettings = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          phone_number: phoneNumber,
          dob,
          state,
          country,
          zip_code: zipCode,
          city,
          street,
          apartment,
          newsletter,
          loyalty_news: loyaltyNews,
          printed_brochures: printedBrochures,
          gear_preference: gearPreference,
          activities
        }
      })
      
      if (error) throw error
      
      setMessage({ type: 'success', text: 'Settings updated successfully!' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'An error occurred while saving.' })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?\nThis action is permanent and cannot be undone.")) {
      setLoading(true)
      try {
        if (session?.user?.id) {
          await supabase.from('favorites').delete().eq('user_id', session.user.id)
          await supabase.from('cart_items').delete().eq('user_id', session.user.id)
        }
        await supabase.auth.signOut()
        alert("Your account has been deleted successfully.")
        navigate('/')
      } catch (err) {
        alert("Failed to delete account details. Logging out instead.")
        await supabase.auth.signOut()
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', desc: 'Your feed with member offers' },
    { id: 'orders', title: 'Orders', desc: 'View your orders' },
    { id: 'wishlist', title: 'Wishlist', desc: 'View all items on your wishlist' },
    { id: 'loyalty', title: 'Loyalty program', desc: 'Points, benefits, and rewards' },
    { id: 'referral', title: 'Refer friends, get rewards', desc: 'Get your pals involved for 50 points per referral.' },
    { id: 'settings', title: 'Settings', desc: 'Shipping address, notifications, and more' }
  ]

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardTab 
            favorites={favorites} 
            setActiveTab={setActiveTab} 
            navigate={navigate} 
            copySuccess={copySuccess} 
            setCopySuccess={setCopySuccess} 
          />
        )
      case 'orders':
        return <OrdersTab navigate={navigate} />
      case 'wishlist':
        return <WishlistTab favorites={favorites} navigate={navigate} />
      case 'loyalty':
        return <LoyaltyTab />
      case 'referral':
        return (
          <ReferralTab 
            copySuccess={copySuccess} 
            setCopySuccess={setCopySuccess} 
            openFaq={openFaq} 
            setOpenFaq={setOpenFaq} 
          />
        )
      case 'settings':
        return (
          <SettingsTab 
            email={email}
            firstName={firstName} setFirstName={setFirstName}
            middleName={middleName} setMiddleName={setMiddleName}
            lastName={lastName} setLastName={setLastName}
            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
            dob={dob} setDob={setDob}
            state={state} setState={setState}
            country={country} setCountry={setCountry}
            zipCode={zipCode} setZipCode={setZipCode}
            city={city} setCity={setCity}
            street={street} setStreet={setStreet}
            apartment={apartment} setApartment={setApartment}
            newsletter={newsletter} setNewsletter={setNewsletter}
            loyaltyNews={loyaltyNews} setLoyaltyNews={setLoyaltyNews}
            printedBrochures={printedBrochures} setPrintedBrochures={setPrintedBrochures}
            gearPreference={gearPreference} setGearPreference={setGearPreference}
            activities={activities} setActivities={setActivities}
            loading={loading}
            message={message}
            handleSaveSettings={handleSaveSettings}
            handleDeleteAccount={handleDeleteAccount}
          />
        )
      default:
        return (
          <DashboardTab 
            favorites={favorites} 
            setActiveTab={setActiveTab} 
            navigate={navigate} 
            copySuccess={copySuccess} 
            setCopySuccess={setCopySuccess} 
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
      <Navbar session={session} />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          
          <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-6">
            
            <div className="relative w-full h-[220px] overflow-hidden select-none border border-neutral-100">
              <img 
                src={settingProfileImg} 
                alt="Welcome banner" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex gap-2">
                  <span className="border border-white/60 bg-black/20 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                    ADVENTURER 🌲
                  </span>
                  <span className="border border-white/60 bg-black/20 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase">
                    70 PTS
                  </span>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold tracking-wide font-sans">
                    Welcome
                  </h2>
                  <p className="text-[11px] text-neutral-300 mt-1 font-semibold tracking-wide uppercase">
                    {getMemberSince()}
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex bg-white border border-neutral-100 flex-col divide-y divide-neutral-100">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setMessage({ type: '', text: '' })
                    }}
                    className="w-full text-left p-5 flex items-center justify-between hover:bg-neutral-50/50 transition-colors cursor-pointer select-none group"
                  >
                    <div className="pr-4 transition-transform duration-200 group-hover:translate-x-2">
                      <span className={`text-sm font-semibold uppercase tracking-wider block transition-colors ${
                        isActive ? 'text-[#E30613] italic font-bold' : 'text-black'
                      }`}>
                        {item.title}
                      </span>
                      <span className="text-xs text-neutral-400 mt-1 block">
                        {item.desc}
                      </span>
                    </div>
                    <FiChevronRight 
                      size={16} 
                      className={`flex-shrink-0 transition-all ${
                        isActive ? 'text-[#E30613] translate-x-1.5' : 'text-neutral-400 group-hover:text-black group-hover:translate-x-1'
                      }`} 
                    />
                  </button>
                )
              })}
            </div>

            <div className="lg:hidden w-full relative">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full bg-white border border-neutral-200 p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="text-left">
                  <span className="text-sm font-bold uppercase tracking-wider text-[#E30613] italic block">
                    {menuItems.find(item => item.id === activeTab)?.title}
                  </span>
                  <span className="text-[10px] text-neutral-400 block uppercase tracking-wider mt-0.5">
                    Tap to switch category
                  </span>
                </div>
                <FiChevronDown 
                  size={20} 
                  className={`text-neutral-500 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180 text-black' : ''}`} 
                />
              </button>

              {isMobileMenuOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-neutral-200 shadow-xl z-50 divide-y divide-neutral-100">
                  {menuItems.map((item) => {
                    const isActive = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id)
                          setIsMobileMenuOpen(false)
                          setMessage({ type: '', text: '' })
                        }}
                        className="w-full text-left px-5 py-4 hover:bg-neutral-50/50 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <div className="pr-4">
                          <span className={`text-sm font-semibold uppercase tracking-wider block ${
                            isActive ? 'text-[#E30613] italic font-bold' : 'text-black'
                          }`}>
                            {item.title}
                          </span>
                          <span className="text-xs text-neutral-400 mt-0.5 block">
                            {item.desc}
                          </span>
                        </div>
                        {isActive && <span className="text-[#E30613] text-sm">✓</span>}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="hidden lg:block px-5 pb-5">
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 text-neutral-500 hover:text-red-600 transition-colors font-bold uppercase tracking-wider text-xs cursor-pointer select-none"
              >
                <FiLogOut size={16} />
                LOGOUT
              </button>
            </div>

          </div>

          <div className="flex-1 w-full flex flex-col gap-6">
            {renderActiveTabContent()}
            
            <div className="lg:hidden w-full flex justify-center py-8 mt-6">
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 text-neutral-500 hover:text-red-600 transition-colors font-bold uppercase tracking-wider text-xs cursor-pointer select-none"
              >
                <FiLogOut size={16} />
                LOGOUT
              </button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
