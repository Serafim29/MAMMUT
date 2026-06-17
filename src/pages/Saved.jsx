import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { useFavorites } from '../context/FavoritesContext'

function Saved({ session }) {
  const { favorites, loading } = useFavorites()

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
      <Navbar session={session} />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          
          {!session && (
            <div className="w-full lg:w-[360px] bg-white border border-neutral-100 p-8 flex flex-col select-none flex-shrink-0">
              <h2 className="text-xl font-bold uppercase tracking-wide leading-tight text-neutral-900">
                Save your wishlist!
              </h2>
              <p className="text-sm font-normal text-neutral-600 mt-4 leading-relaxed">
                Your wishlist will expire in 30 days. Log in or create an account to save it permanently.
              </p>
              
              <div className="flex flex-col gap-3 mt-8">
                <Link
                  to="/signup"
                  className="w-full bg-black text-white py-4 text-[11px] font-extrabold uppercase tracking-[0.1em] hover:bg-neutral-900 transition-colors text-center inline-block"
                >
                  Create an account
                </Link>
                <Link
                  to="/signup"
                  className="w-full bg-transparent text-black border border-neutral-300 py-4 text-[11px] font-extrabold uppercase tracking-[0.1em] hover:border-black transition-colors text-center inline-block"
                >
                  Login
                </Link>
              </div>
            </div>
          )}

          <div className="flex-1 bg-white border border-neutral-100 p-6 md:p-10 w-full min-h-[500px] flex flex-col">
            <div className="border-b border-neutral-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 select-none">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-black font-sans uppercase">
                Your Wishlist
              </h1>
              <span className="text-xs md:text-sm font-semibold text-neutral-500 uppercase tracking-widest">
                {favorites.length} / 50 products saved to the wishlist
              </span>
            </div>

            {loading ? (
              <div className="flex-1 flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
              </div>
            ) : favorites.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center select-none max-w-lg mx-auto">
                <p className="text-base text-neutral-500 leading-relaxed">
                  Your wishlist is empty. Explore our collection of premium mountain sports clothing and equipment to find your favorites.
                </p>
                <Link
                  to="/"
                  className="mt-8 inline-flex items-center bg-black text-white font-extrabold uppercase tracking-[0.1em] text-[11px] md:text-xs select-none hover:bg-neutral-900 active:bg-neutral-800 transition-colors group cursor-pointer h-[54px] rounded-none shadow-sm"
                >
                  <span className="px-6 flex items-center justify-center h-full text-center whitespace-nowrap">
                    EXPLORE COLLECTION
                  </span>
                  <span className="w-14 h-full border-l border-neutral-800 flex items-center justify-center text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {favorites.map((product) => (
                  <div key={product.id} className="flex flex-col">
                    <ProductCard product={product} />
                    <div className="flex items-center gap-3 mt-4 border-t border-neutral-100 pt-3 text-xs font-semibold text-neutral-500 select-none">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-black cursor-pointer rounded-none border-neutral-300"
                        />
                        Compare
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}

export default Saved
