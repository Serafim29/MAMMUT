import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi'
import { useFavorites } from '../context/FavoritesContext'

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const images = product.variants?.[0]?.images || []
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrev = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }
  }

  const handleNext = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }
  }

  const currentImage = images[currentImageIndex] || 'https://via.placeholder.com/400x500?text=No+Image'

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="flex flex-col group/card cursor-pointer w-full text-black select-none"
    >
      <div className="relative aspect-[3/4] bg-[#ECECEC] w-full overflow-hidden flex items-center justify-center group/img rounded-none">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-102"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md border border-neutral-100 text-black hover:bg-neutral-50 active:scale-95 transition-all opacity-0 group-hover/img:opacity-100 duration-300 cursor-pointer"
              aria-label="Previous image"
            >
              <FiChevronLeft className="text-xl stroke-[2.5]" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md border border-neutral-100 text-black hover:bg-neutral-50 active:scale-95 transition-all opacity-0 group-hover/img:opacity-100 duration-300 cursor-pointer"
              aria-label="Next image"
            >
              <FiChevronRight className="text-xl stroke-[2.5]" />
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 mb-1.5 min-h-[26px]">
        {product.badge ? (
          <span className="border border-black text-black px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-[0.05em] bg-white leading-none">
            {product.badge}
          </span>
        ) : (
          <span className="opacity-0 select-none text-[9px] py-0.5 leading-none">Spacer</span>
        )}
        <button 
          className={`transition-colors duration-200 focus:outline-none p-1 cursor-pointer ${
            isFavorite(product.id) ? 'text-[#E30613]' : 'text-neutral-500 hover:text-black'
          }`}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            toggleFavorite(product)
          }}
        >
          <FiHeart 
            className="text-[17px] stroke-[2]" 
            fill={isFavorite(product.id) ? '#E30613' : 'none'}
          />
        </button>
      </div>

      <h3 className="font-bold text-[15px] text-neutral-900 leading-snug tracking-tight hover:underline">
        {product.name}
      </h3>
      <p className="font-bold text-[15px] text-black mt-1">
        ${product.price}
      </p>
    </div>
  )
}

export default ProductCard
