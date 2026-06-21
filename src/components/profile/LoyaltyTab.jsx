import React from 'react'

export default function LoyaltyTab() {
  return (
    <div className="bg-white border border-neutral-100 p-8 md:p-12 w-full min-h-[500px] flex flex-col">
      <div className="text-center mb-8 border-b border-neutral-100 pb-6 w-full select-none">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-neutral-900">
          Loyalty Program
        </h2>
        <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mt-2">
          Your Access Tier: Adventurer 🌲 (70 Points)
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto w-full select-none">
        <div className="border border-neutral-100 p-6 bg-neutral-50/50 mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-black">
            Current Tier Progress
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            You are earning points on every purchase. Read details about your progress below.
          </p>
          
          <div className="mt-8 relative flex items-center justify-between px-6 max-w-md mx-auto">
            <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-neutral-200 z-0" />
            <div className="flex flex-col items-center z-10 relative">
              <div className="w-10 h-10 rounded-full bg-[#E30613] flex items-center justify-center text-white shadow-md">🌲</div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black mt-2">Adventurer</span>
            </div>
            <div className="flex flex-col items-center z-10 relative">
              <div className="w-10 h-10 rounded-full bg-[#D4D4D4] flex items-center justify-center text-neutral-600 border-2 border-white shadow-sm">⚙️</div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mt-2">Explorer</span>
              <span className="text-[9px] text-neutral-400 font-medium">500 pts</span>
            </div>
          </div>
        </div>

        <h3 className="text-base font-bold uppercase tracking-wider text-neutral-900 mb-4">
          Member Benefits & Tiers
        </h3>
        
        <div className="space-y-4">
          <div className="border border-neutral-200/60 p-4">
            <h4 className="text-xs font-extrabold uppercase text-[#E30613] tracking-widest">
              Adventurer (0 - 499 Points)
            </h4>
            <ul className="text-xs text-neutral-600 mt-2 space-y-1 list-disc list-inside">
              <li>10% welcome voucher on registration</li>
              <li>Spend and save promotions access</li>
              <li>Free standard shipping on orders over $150</li>
            </ul>
          </div>
          
          <div className="border border-neutral-200/60 p-4">
            <h4 className="text-xs font-extrabold uppercase text-neutral-800 tracking-widest">
              Explorer (500 - 1499 Points)
            </h4>
            <ul className="text-xs text-neutral-600 mt-2 space-y-1 list-disc list-inside">
              <li>15% seasonal voucher</li>
              <li>Free shipping on all orders</li>
              <li>24 hours early access to online outlet sales</li>
              <li>Free Mammut sticker pack</li>
            </ul>
          </div>
          
          <div className="border border-neutral-200/60 p-4">
            <h4 className="text-xs font-extrabold uppercase text-neutral-800 tracking-widest">
              Mountaineer (1500+ Points)
            </h4>
            <ul className="text-xs text-neutral-600 mt-2 space-y-1 list-disc list-inside">
              <li>20% annual voucher</li>
              <li>Free shipping & free returns</li>
              <li>Exclusive access to Mountaineer products</li>
              <li>Annual gift from Mammut School</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
