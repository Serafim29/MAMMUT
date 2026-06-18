import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiTrash2, FiClock, FiChevronDown, FiArrowRight, FiInfo } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { supabase } from '../supabaseClient'

const ApplePayIcon = () => (
  <svg className="h-6 w-9 border border-neutral-200 p-0.5 bg-white flex-shrink-0" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.8 19.5h2.2v-7.1h1.5c1.4 0 2.2.7 2.2 2s-.8 2-2.2 2H10v3.1H7.8v-8.3H11.5c2.4 0 4-1.3 4-3.5S14 8.7 11.5 8.7H7.8v10.8zM24 13.5c-1.8 0-3.3.8-3.9 2.2v-2h-2v5.8h2v-3.4c0-1.2.9-2 2-2s1.9.8 1.9 2v3.4h2v-3.6c0-2.3-1.6-4.4-4-4.4zM32.8 13.5c-1.8 0-3.3.8-3.9 2.2v-2h-2v5.8h2v-3.4c0-1.2.9-2 2-2s1.9.8 1.9 2v3.4h2v-3.6c0-2.3-1.6-4.4-4-4.4z" fill="#000"/>
    <path d="M19.7 6.4c.5-.7.8-1.5.7-2.4-.8.1-1.7.5-2.2 1.2-.5.6-.8 1.5-.7 2.3.9 0 1.7-.5 2.2-1.1z" fill="#000"/>
    <path d="M19.2 7c-.5-.3-1.2-.5-1.8-.5-1.5 0-2.5 1-2.5 2.3 0 1.4 1 2.3 2.4 2.3.6 0 1.3-.2 1.7-.5.1.2.3.4.6.4.3 0 .5-.2.5-.5V7.4c0-.3-.2-.4-.4-.4z" fill="#000"/>
  </svg>
)

const GooglePayIcon = () => (
  <svg className="h-6 w-9 border border-neutral-200 p-0.5 bg-white flex-shrink-0" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 10.5h-4v11h4v-11zM22.5 13.5c-1.8 0-3.3.8-3.9 2.2v-2h-2v8.8h2v-5c0-1.2.9-2 2-2s1.9.8 1.9 2v5h2v-5.2c0-2.3-1.6-4.6-4-4.6zM32.5 13.5c-1.8 0-3.3.8-3.9 2.2v-2h-2v5.8h2v-3.4c0-1.2.9-2 2-2s1.9.8 1.9 2v3.4h2v-3.6c0-2.3-1.6-4.4-4-4.4z" fill="#000"/>
    <path d="M10.5 5.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#4285F4"/>
  </svg>
)

const MasterCardIcon = () => (
  <svg className="h-6 w-9 border border-neutral-200 p-0.5 bg-white flex-shrink-0" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="16" r="10" fill="#EB001B" />
    <circle cx="30" cy="16" r="10" fill="#F79E1B" fillOpacity="0.8" />
  </svg>
)

const VisaIcon = () => (
  <svg className="h-6 w-9 border border-neutral-200 p-0.5 bg-white flex-shrink-0" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.8 20.3l2.2-7h1.8l-2.2 7h-1.8zm8.6-6.8c-.4-.2-.9-.3-1.5-.3-1.6 0-2.7.9-2.7 2.1 0 1 .9 1.5 1.5 1.8.7.3.9.5.9.8 0 .4-.5.7-1.1.7-.8 0-1.3-.2-1.7-.4l-.2-.1-.3 1.8c.5.2 1.4.4 2.2.4 2.2 0 3.7-1.1 3.7-2.8 0-.9-.6-1.6-1.8-2.2-.6-.3-1-.5-1-.9 0-.3.3-.6.9-.6.7 0 1.2.1 1.6.3l.2.1.3-1.7zm5.5 3.3c.2.5.9 2.5.9 2.5h1.6l-2.5-7h-1.8l-4.1 7h1.7l.3-.9h2.2.7zm-1.8-1.5l.6-1.8.3 1.8h-.9zm-19.1-1.8l1.8 4.7.2.9h.1l.9-5.6h-3zm-1.4 0l-1.3.5c-.3.1-.4.2-.4.4l-.1 1.2c2.1.5 3.7 2.1 3.7 2.1l1.5-6.2h-3.4z" fill="#1A1F71" />
  </svg>
)

const PayPalIcon = () => (
  <svg className="h-6 w-9 border border-neutral-200 p-0.5 bg-white flex-shrink-0" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 9.8c.2-1.3 1-2.3 2.5-2.3H26c2.4 0 4.1 1.2 3.6 3.8-.5 2.6-2.3 4.2-4.7 4.2h-3.3l-1.6 8.3h-3.3l1.8-14zm8.6.6c.1-.8-.4-1.3-1.2-1.3H21.4l-1.1 5.9h3.5c1 0 1.7-.6 1.9-1.8.1-.8 0-2 .3-2.8z" fill="#003087" />
    <path d="M22.5 13.8c.2-1.3 1-2.3 2.5-2.3H31c2.4 0 4.1 1.2 3.6 3.8-.5 2.6-2.3 4.2-4.7 4.2h-3.3l-1.6 8.3h-3.3l1.8-14zm8.6.6c.1-.8-.4-1.3-1.2-1.3H26.4l-1.1 5.9h3.5c1 0 1.7-.6 1.9-1.8.1-.8 0-2 .3-2.8z" fill="#0079C1" fillOpacity="0.8" />
  </svg>
)

function Cart({ session }) {
  const navigate = useNavigate()
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart()
  const [recommendations, setRecommendations] = useState([])
  const [recLoading, setRecLoading] = useState(true)

  const isMember = !!session?.user
  const discountRate = 0.25
  const discountAmount = isMember ? cartTotal * discountRate : 0
  const estimatedTotal = cartTotal - discountAmount

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setRecLoading(true)
        const cartProductIds = cart.map((item) => item.product_id)
        
        let query = supabase.from('products').select('*').limit(4)
        if (cartProductIds.length > 0) {
          query = query.not('id', 'in', `(${cartProductIds.join(',')})`)
        }

        const { data, error } = await query
        if (!error && data) {
          setRecommendations(data)
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err)
      } finally {
        setRecLoading(false)
      }
    }
    fetchRecommendations()
  }, [cart])

  const handleQtyChange = (itemId, e) => {
    updateQuantity(itemId, parseInt(e.target.value))
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
      <Navbar session={session} />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 select-none">
        
        <h1 className="text-2xl md:text-[32px] font-extrabold tracking-tight text-black font-sans uppercase mb-8 select-text">
          Your Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          
          <div className="flex-1 bg-white border border-neutral-100 p-6 md:p-10 w-full min-h-[400px] flex flex-col justify-between">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center max-w-lg mx-auto">
                <p className="text-base text-neutral-500 leading-relaxed">
                  Your cart is empty. Explore our collection of premium mountain sports clothing and equipment to find your favorites.
                </p>
                <Link
                  to="/"
                  className="mt-8 inline-flex items-center bg-black text-white font-extrabold uppercase tracking-[0.1em] text-[11px] md:text-xs hover:bg-neutral-900 active:bg-neutral-800 transition-colors group cursor-pointer h-[54px] rounded-none shadow-sm"
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
              <div className="divide-y divide-neutral-100 w-full">
                {cart.map((item) => {
                  const productPrice = item.product?.price || 0
                  const hasDiscount = isMember
                  const finalPrice = hasDiscount ? productPrice * (1 - discountRate) : productPrice
                  
                  return (
                    <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex gap-4 md:gap-6 items-start justify-between w-full">
                      <Link 
                        to={`/product/${item.product_id}`}
                        className="w-[80px] md:w-[100px] aspect-[3/4] bg-[#F5F5F3] border border-neutral-200/40 overflow-hidden flex-shrink-0 cursor-pointer block"
                      >
                        <img 
                          src={item.product?.variants?.[0]?.thumbnail_url || 'https://via.placeholder.com/200x266?text=No+Image'} 
                          alt={item.product?.name} 
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${item.product_id}`}
                          className="font-bold text-[14px] md:text-[15px] text-neutral-900 leading-snug hover:underline cursor-pointer block"
                        >
                          {item.product?.name}
                        </Link>
                        <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wide mt-1">
                          {item.color_name} - {item.size}
                        </p>

                        <p className="text-[#E30613] text-[11px] font-bold flex items-center gap-1.5 mt-2">
                          <FiClock size={12} className="stroke-[2.5]" /> Only 4 in stock
                        </p>

                        <div className="flex items-center gap-4 mt-4 select-none">
                          <div className="relative">
                            <select
                              value={item.quantity}
                              onChange={(e) => handleQtyChange(item.id, e)}
                              className="border border-neutral-300 hover:border-black py-1.5 pl-3 pr-8 text-xs font-bold bg-white focus:outline-none cursor-pointer rounded-none appearance-none"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none stroke-[2.5]" size={12} />
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-[#E30613] transition-colors p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <FiTrash2 size={16} className="stroke-[2]" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 select-none">
                        {hasDiscount ? (
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-extrabold text-[14px] md:text-[15px] text-black">
                              ${(finalPrice * item.quantity).toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-neutral-400 line-through">
                                ${(productPrice * item.quantity).toFixed(2)}
                              </span>
                              <span className="bg-[#E9FBE9] text-[#137333] px-1.5 py-0.5 rounded-none text-[9px] font-extrabold tracking-wider">
                                -25%
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="font-extrabold text-[14px] md:text-[15px] text-black">
                            ${(productPrice * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="w-full lg:w-[360px] bg-white border border-neutral-100 p-8 flex flex-col justify-between flex-shrink-0 shadow-sm">
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4 mb-5">
                Summary
              </h2>

              <div className="space-y-4 text-xs font-semibold text-neutral-800 border-b border-neutral-100 pb-5 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-bold text-neutral-900">${cartTotal.toFixed(2)}</span>
                </div>

                {isMember && (
                  <div className="flex justify-between items-center text-[#137333]">
                    <span>Members days SS26 US (-25%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Tax</span>
                  <span className="text-[11px] text-neutral-400 font-normal">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-6">
                <span className="font-extrabold text-sm uppercase tracking-wider text-black">Estimated total</span>
                <span className="font-black text-2xl text-black">${estimatedTotal.toFixed(2)}</span>
              </div>

              <button 
                disabled={cart.length === 0}
                className={`w-full text-white py-4 text-[11px] font-extrabold uppercase tracking-[0.1em] text-center inline-block cursor-pointer transition-all rounded-none ${
                  cart.length === 0 
                    ? 'bg-neutral-300 cursor-not-allowed' 
                    : 'bg-black hover:bg-neutral-900 active:scale-99'
                }`}
              >
                Checkout
              </button>

              {cartCount > 0 && (
                <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-5 text-xs text-neutral-800 font-semibold select-none">
                  <span className="text-neutral-500">Earn {Math.floor(estimatedTotal)} points with this order</span>
                  <FiChevronDown size={14} className="stroke-[2] text-neutral-400 cursor-pointer" />
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-neutral-100 pt-6">
              <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                <ApplePayIcon />
                <GooglePayIcon />
                <MasterCardIcon />
                <VisaIcon />
                <PayPalIcon />
              </div>
              
              <div className="space-y-2.5 text-[11px] font-semibold text-neutral-500 text-center select-none">
                <p>Free shipping from $50</p>
                <p>Free returns</p>
                <p>Delivery time: 2-5 business days</p>
              </div>
            </div>
          </div>

        </div>

        {!recLoading && recommendations.length > 0 && (
          <section className="mt-20">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black mb-8 select-text uppercase font-sans">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

      </main>
      
      <Footer />
    </div>
  )
}

export default Cart
