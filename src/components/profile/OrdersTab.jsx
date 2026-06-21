import React from 'react'

export default function OrdersTab({ navigate }) {
  return (
    <div className="bg-white border border-neutral-100 p-8 md:p-12 w-full min-h-[500px] flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-neutral-900 mb-12 border-b border-neutral-100 pb-6 w-full select-none">
        Your Orders
      </h2>
      
      <div className="max-w-xl mx-auto py-8 select-none flex flex-col items-center">
        <h3 className="text-base md:text-[18px] font-extrabold text-neutral-900 uppercase tracking-wide">
          No orders yet - Your next adventure starts here
        </h3>
        <p className="text-xs text-neutral-500 mt-4 leading-relaxed max-w-sm">
          Place your first order today and start collecting loyalty points for exclusive benefits.
        </p>
        <p className="text-xs font-bold text-black mt-1">
          Every $1 spent = 1 point
        </p>
        
        <div className="mt-8">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center border border-black bg-white text-black font-extrabold uppercase tracking-[0.1em] text-xs h-[48px] hover:bg-black hover:text-white transition-all group cursor-pointer"
          >
            <span className="px-8 flex items-center justify-center h-full font-bold select-none">
              Shop Now
            </span>
            <span className="w-12 h-full border-l border-black flex items-center justify-center text-lg transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
