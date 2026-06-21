import React from 'react'
import { FiCopy } from 'react-icons/fi'

const CardButton = ({ label, onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center border border-black bg-white text-black font-extrabold uppercase tracking-[0.1em] text-xs h-[48px] hover:bg-black hover:text-white transition-all group cursor-pointer ${className}`}
    >
      <span className="px-6 flex items-center justify-center h-full font-bold select-none">
        {label}
      </span>
      <span className="w-12 h-full border-l border-black flex items-center justify-center text-lg transition-transform group-hover:translate-x-1">
        →
      </span>
    </button>
  )
}

export default function DashboardTab({ favorites, setActiveTab, navigate, copySuccess, setCopySuccess }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start w-full">
      <div className="bg-white border border-neutral-100 p-8 flex flex-col justify-between min-h-[300px]">
        <div>
          <h3 className="text-[20px] font-bold text-black font-sans flex items-center gap-1 select-none">
            Hello, Adventurer <span className="text-[#E30613]">🌲</span>
          </h3>
          
          <div className="mt-3 flex flex-wrap gap-2.5 items-center select-none">
            <span className="bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-800">
              70/500 points
            </span>
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
              430 points to Explorer
            </span>
          </div>
          
          <div className="mt-8 relative flex items-center justify-between px-6 select-none">
            <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-neutral-200 z-0" />
            
            <div className="flex flex-col items-center z-10 relative">
              <div className="w-10 h-10 rounded-full bg-[#E30613] flex items-center justify-center text-white shadow-md">
                🌲
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black mt-2">
                Adventurer
              </span>
            </div>
            
            <div className="flex flex-col items-center z-10 relative">
              <div className="w-10 h-10 rounded-full bg-[#D4D4D4] flex items-center justify-center text-neutral-600 border-2 border-white shadow-sm">
                ⚙️
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mt-2">
                Explorer
              </span>
              <span className="text-[9px] text-neutral-400 font-medium">
                500 pts
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <CardButton label="See benefits" onClick={() => setActiveTab('loyalty')} />
        </div>
      </div>

      <div className="bg-[#E30613] text-white p-8 flex flex-col justify-between min-h-[300px]">
        <div>
          <h3 className="text-[20px] font-extrabold uppercase tracking-wider leading-tight select-none">
            MEMBER DAYS ARE HERE
          </h3>
          
          <p className="text-xs font-medium text-white/90 mt-4 leading-relaxed select-none">
            Spend and save on the gear you love with your exclusive member offer.
          </p>
          
          <div className="mt-4 space-y-1 text-xs font-bold uppercase tracking-wider text-white select-none">
            <p>Spend $200, get 20% off</p>
            <p>Spend $350, get 25% off</p>
            <p>Spend $500 +, get 30% off</p>
          </div>
          
          <p className="text-[10px] text-white/80 mt-4 font-semibold uppercase tracking-wider select-none">
            Discount will be applied at checkout.
          </p>
          <p className="text-[9px] text-white/60 mt-1 italic select-none">
            *Excluding Eiger, Avy Safety and Collab products. See T&C
          </p>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center border border-white bg-transparent text-white font-extrabold uppercase tracking-[0.1em] text-xs h-[48px] hover:bg-white hover:text-[#E30613] transition-all group cursor-pointer"
          >
            <span className="px-6 flex items-center justify-center h-full font-bold select-none">
              Shop Now
            </span>
            <span className="w-12 h-full border-l border-white flex items-center justify-center text-lg transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-neutral-100 p-8 flex flex-col justify-between min-h-[300px]">
        <div>
          <h3 className="text-[20px] font-bold text-black font-sans select-none">
            Refer a friend
          </h3>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1 select-none">
            Invite a friend and earn points!
          </p>
          
          <div className="mt-5 bg-[#F4F0EB] px-4 py-3 flex items-center justify-between border border-neutral-200/50">
            <span className="text-xs font-semibold text-neutral-800 font-mono tracking-tight select-all">
              mammut.com/referral/w0imiov
            </span>
            <button 
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('mammut.com/referral/w0imiov')
                setCopySuccess(true)
                setTimeout(() => setCopySuccess(false), 2000)
              }}
              className="text-neutral-500 hover:text-black cursor-pointer p-1"
              aria-label="Copy referral link"
            >
              {copySuccess ? <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Copied!</span> : <FiCopy size={15} />}
            </button>
          </div>
          
          <p className="text-xs text-neutral-500 mt-5 leading-relaxed select-none">
            Get 50 points for every friend you refer. They'll get 50 points too and 10% discount for their next purchase.
          </p>
        </div>
        
        <div className="mt-8">
          <CardButton label="Learn more" onClick={() => setActiveTab('referral')} />
        </div>
      </div>

      <div className="bg-white border border-neutral-100 p-8 flex flex-col justify-between min-h-[300px]">
        <div>
          <h3 className="text-[20px] font-bold text-black font-sans select-none">
            Your orders
          </h3>
          
          <p className="text-xs font-bold text-neutral-800 mt-4 uppercase tracking-wider select-none">
            There are no recent orders.
          </p>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed select-none">
            You can view your order history, add guest or retail orders, request a return, or leave a review.
          </p>
        </div>
        
        <div className="mt-8">
          <CardButton label="View orders" onClick={() => setActiveTab('orders')} />
        </div>
      </div>

      <div className="bg-white border border-neutral-100 p-8 flex flex-col justify-between min-h-[300px]">
        <div>
          <h3 className="text-[20px] font-bold text-black font-sans select-none">
            Wishlist ({favorites.length})
          </h3>
          
          {favorites.length === 0 ? (
            <>
              <p className="text-xs font-bold text-neutral-800 mt-4 uppercase tracking-wider select-none">
                Your Wishlist is Empty
              </p>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed select-none">
                Add your favorite items to see them here.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-bold text-neutral-800 mt-4 uppercase tracking-wider select-none">
                You have {favorites.length} saved {favorites.length === 1 ? 'item' : 'items'}.
              </p>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed select-none">
                Go to wishlist view to manage or buy your saved items.
              </p>
            </>
          )}
        </div>
        
        <div className="mt-8">
          <CardButton 
            label={favorites.length === 0 ? "Begin browsing" : "View Wishlist"} 
            onClick={() => {
              if (favorites.length === 0) {
                navigate('/');
              } else {
                setActiveTab('wishlist');
              }
            }} 
          />
        </div>
      </div>

      <div className="bg-white border border-neutral-100 p-8 flex flex-col justify-between min-h-[300px]">
        <div>
          <h3 className="text-[20px] font-bold text-black font-sans select-none">
            Settings
          </h3>
          
          <p className="text-xs text-neutral-500 mt-4 leading-relaxed select-none">
            Update shipping address, newsletter, notifications, and other account information.
          </p>
        </div>
        
        <div className="mt-8">
          <CardButton label="Go to settings" onClick={() => setActiveTab('settings')} />
        </div>
      </div>
    </div>
  )
}
