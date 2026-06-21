import React from 'react'
import { FiHeart } from 'react-icons/fi'
import ProductCard from '../ProductCard'

export default function WishlistTab({ favorites, navigate }) {
  return (
    <div className="bg-white border border-neutral-100 p-8 md:p-12 w-full min-h-[500px] flex flex-col">
      <div className="text-center mb-8 border-b border-neutral-100 pb-6">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-neutral-900 select-none">
          Wishlist
        </h2>
      </div>
      
      {favorites.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-12 select-none">
          <FiHeart size={44} className="text-neutral-400 stroke-[1.5px] mb-4" />
          <h3 className="text-base font-bold text-neutral-950 uppercase tracking-wide">
            Your wishlist is empty
          </h3>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
            When you favourite items you love, you'll find them here
          </p>
          <button 
            onClick={() => navigate('/')}
            className="mt-8 border border-neutral-300 px-10 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.15em] hover:border-black transition-colors bg-white text-black cursor-pointer"
          >
            START BROWSING
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
