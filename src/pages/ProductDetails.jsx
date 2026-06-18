import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight, FiHeart, FiX, FiTruck, FiRotateCcw, FiClock, FiCheck, FiInfo } from 'react-icons/fi'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'

function ProductDetails({ session }) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [showCartModal, setShowCartModal] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        const { data, error: fetchErr } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()

        if (fetchErr) throw fetchErr
        if (!data) throw new Error('Product not found')

        setProduct(data)
        
        if (data.variants?.[0]?.sizes?.length > 0) {
          setSelectedSize(data.variants[0].sizes[0])
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
        <Navbar session={session} />
        <main className="flex-1 flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
        <Navbar session={session} />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center py-32">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-[#E30613]">Product Not Found</h1>
          <p className="text-neutral-500 mt-2">{error || 'The requested product could not be loaded.'}</p>
          <Link to="/" className="mt-8 border border-black px-6 py-2.5 hover:bg-black hover:text-white transition-all text-xs font-bold tracking-widest uppercase">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const activeVariant = product.variants?.[activeVariantIndex] || product.variants?.[0]
  const images = activeVariant?.images || []
  const sizes = activeVariant?.sizes || []

  const handleVariantClick = (index) => {
    setActiveVariantIndex(index)
    setActiveImageIndex(0)
    if (product.variants?.[index]?.sizes?.length > 0) {
      setSelectedSize(product.variants[index].sizes[0])
    }
  }

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      alert('Please select a size first.')
      return
    }
    addToCart(product, activeVariant.color_name, selectedSize, 1)
    setShowCartModal(true)
  }

  const handlePrevImages = () => {
    if (images.length <= 2) return
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 2 : prev - 1))
  }

  const handleNextImages = () => {
    if (images.length <= 2) return
    setActiveImageIndex((prev) => (prev >= images.length - 2 ? 0 : prev + 1))
  }

  const activeMainImage = images[activeImageIndex] || 'https://via.placeholder.com/600x800?text=No+Image'
  const activeSecondaryImage = images[activeImageIndex + 1] || images[0]

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-black relative">
      <Navbar session={session} />
      
      {showCartModal && (
        <div 
          onClick={() => setShowCartModal(false)}
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        />
      )}

      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 shadow-2xl transition-transform duration-300 transform p-8 flex flex-col justify-between select-none ${
          showCartModal ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-neutral-100 pb-5 mb-6">
            <h3 className="font-extrabold text-[15px] uppercase tracking-wider text-black flex items-center gap-2">
              <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">✓</span>
              Added to your cart!
            </h3>
            <button 
              onClick={() => setShowCartModal(false)}
              className="text-black hover:text-neutral-500 cursor-pointer p-1"
            >
              <FiX size={20} className="stroke-[2.5]" />
            </button>
          </div>

          <div className="flex gap-4 items-start bg-neutral-50 p-4 border border-neutral-100">
            <div className="w-[80px] aspect-[3/4] bg-white flex-shrink-0 border border-neutral-200/50 overflow-hidden">
              <img 
                src={activeVariant.thumbnail_url} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-xs">
              <h4 className="font-bold text-[14px] text-neutral-900 leading-snug">{product.name}</h4>
              <p className="text-neutral-500 mt-1.5 font-medium uppercase tracking-wide">
                {activeVariant.color_name}, {selectedSize}
              </p>
              <p className="text-neutral-500 mt-1">Qty: 1</p>
              <p className="font-bold text-[14px] text-black mt-2">${product.price}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button 
            onClick={() => setShowCartModal(false)}
            className="w-full bg-white text-black border border-black hover:bg-neutral-50 transition-colors py-4 text-[11px] font-extrabold uppercase tracking-[0.1em] text-center cursor-pointer"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => {
              setShowCartModal(false)
              navigate('/cart')
            }}
            className="w-full bg-black text-white hover:bg-neutral-900 transition-colors py-4 text-[11px] font-extrabold uppercase tracking-[0.1em] text-center cursor-pointer"
          >
            Go to Cart
          </button>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8 select-none">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-4 w-full">
            
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[600px] w-full md:w-[76px] flex-shrink-0 order-2 md:order-1 select-none scrollbar-none pb-2 md:pb-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-[60px] md:w-[76px] aspect-[3/4] bg-[#F5F5F3] overflow-hidden flex items-center justify-center flex-shrink-0 border transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-black' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="relative flex-1 order-1 md:order-2 bg-[#F5F5F3] aspect-[4/3] md:aspect-[3/2] lg:aspect-auto lg:h-[600px] overflow-hidden flex gap-[3px] select-none">
              
              <div className="hidden md:flex w-full h-full gap-0.5">
                <div className="w-1/2 h-full overflow-hidden bg-[#F5F5F3]">
                  <img 
                    src={activeMainImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-1/2 h-full overflow-hidden bg-[#F5F5F3]">
                  <img 
                    src={activeSecondaryImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:hidden w-full h-full">
                <img 
                  src={activeMainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {images.length > 2 && (
                <div className="absolute right-6 bottom-6 flex gap-2">
                  <button 
                    onClick={handlePrevImages}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-neutral-100 text-black hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer"
                    aria-label="Previous images"
                  >
                    <FiChevronLeft className="text-xl stroke-[2.5]" />
                  </button>
                  <button 
                    onClick={handleNextImages}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-neutral-100 text-black hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer"
                    aria-label="Next images"
                  >
                    <FiChevronRight className="text-xl stroke-[2.5]" />
                  </button>
                </div>
              )}
            </div>

          </div>

          <div className="lg:col-span-4 flex flex-col font-sans select-text">
            
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest text-neutral-400 uppercase select-none">
              <span className="hover:text-black cursor-pointer">{product.category}</span>
              <span>&gt;</span>
              <span className="text-neutral-500">{product.subcategory}</span>
            </div>

            <h1 className="text-2xl md:text-[32px] font-bold tracking-tight text-neutral-900 mt-3 leading-tight font-display">
              {product.name}
            </h1>
            <p className="text-xs md:text-sm font-semibold text-neutral-500 mt-1">
              {product.subtitle}
            </p>

            <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 mt-3 select-none">
              <div className="flex items-center gap-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E30613]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E30613]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E30613]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E30613]"></span>
                <span className="w-2.5 h-2.5 rounded-full border border-neutral-300 bg-white"></span>
              </div>
              <span className="ml-2.5 uppercase text-[9px] font-extrabold tracking-[0.08em] text-neutral-500">4 Reviews</span>
            </div>

            <p className="font-extrabold text-[22px] text-neutral-900 mt-5 select-none">
              ${product.price}
            </p>

            <div className="mt-8 select-none">
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-neutral-400">
                {activeVariant.color_name}
              </span>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {product.variants?.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleVariantClick(idx)}
                    className={`w-12 h-12 bg-neutral-100 overflow-hidden flex items-center justify-center border transition-all cursor-pointer ${
                      activeVariantIndex === idx ? 'border-black p-0.5 scale-102' : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <img src={variant.thumbnail_url} alt={variant.color_name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-2.5 select-none">
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-neutral-400">
                  Select Size
                </span>
                <button className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-black hover:underline cursor-pointer">
                  <span className="text-xs">📏</span> Size Guide
                </button>
              </div>

              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-neutral-300 hover:border-neutral-400 focus:border-black py-4 px-4 bg-white text-sm font-semibold tracking-wide focus:outline-none cursor-pointer rounded-none"
              >
                <option value="" disabled>Select your size</option>
                {sizes.map((sz) => (
                  <option key={sz} value={sz}>{sz}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 mt-8 select-none">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(product)
                }}
                className={`w-[54px] h-[54px] border flex items-center justify-center transition-all cursor-pointer rounded-none active:scale-95 ${
                  isFavorite(product.id) 
                    ? 'border-[#E30613] text-[#E30613]' 
                    : 'border-neutral-300 hover:border-black text-neutral-600 hover:text-black'
                }`}
                aria-label="Add to Wishlist"
              >
                <FiHeart 
                  size={20} 
                  className="stroke-[2.2]" 
                  fill={isFavorite(product.id) ? '#E30613' : 'none'}
                />
              </button>
              
              <button
                onClick={handleAddToCartClick}
                className="flex-1 bg-black text-white hover:bg-neutral-900 active:scale-99 transition-all py-4 text-[11px] font-extrabold uppercase tracking-[0.1em] h-[54px] text-center cursor-pointer rounded-none"
              >
                Add To Cart
              </button>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-neutral-800 font-semibold select-none border-b border-neutral-100 pb-5">
              <span className="text-black font-extrabold">+{Math.floor(product.price)} points</span> 
              <span className="text-neutral-500 font-normal">for Mammut Access Members</span>
              <FiInfo className="text-neutral-400 stroke-[2] ml-0.5 cursor-pointer hover:text-black" size={14} />
            </div>

            <div className="mt-5 space-y-3.5 text-xs font-semibold text-neutral-800 border-b border-neutral-100 pb-6 select-none">
              <div className="flex items-center gap-3">
                <FiTruck className="text-neutral-500 stroke-[2.2]" size={16} />
                <span>Free shipping from $50</span>
              </div>
              <div className="flex items-center gap-3">
                <FiRotateCcw className="text-neutral-500 stroke-[2.2]" size={16} />
                <span>Free returns</span>
              </div>
              <div className="flex items-center gap-3">
                <FiClock className="text-neutral-500 stroke-[2.2]" size={16} />
                <span>Delivery time: 2-5 business days</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-neutral-600 select-none cursor-pointer hover:text-black">
              <input
                type="checkbox"
                id="compare"
                className="w-4 h-4 accent-black cursor-pointer rounded-none border border-neutral-300"
              />
              <label htmlFor="compare" className="cursor-pointer">Compare this product</label>
            </div>

          </div>

        </div>

        <section className="mt-20 pt-10 border-t border-neutral-100">
          <div className="max-w-3xl select-text">
            <h2 className="text-xl font-bold uppercase tracking-wider text-black">Description</h2>
            <p className="text-neutral-700 leading-relaxed text-sm mt-4 font-normal">
              {product.description}
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default ProductDetails
