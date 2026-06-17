import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { supabase } from '../supabaseClient'
import teaserDesktop from '../assets/teaser_desktop.jpg'
import teaserMobile from '../assets/teaser_mobile.jpg'
import trailRun from '../assets/TrailRun_SS26_Chamonix_LG-9.jpg'

function Home({ session }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth > 1023 : true)
  const swiperRef = useRef(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setCategoriesLoading(true);

        const { data: prodData, error: prodError } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'FOOTWEAR')
          .order('id', { ascending: true })
          .limit(4);
        
        if (prodError) throw prodError;
        setProducts(prodData || []);

        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('*')
          .not('image_url', 'is', null)
          .order('display_order', { ascending: true });
        
        if (catError) {
          console.warn('Could not fetch categories, table might not exist yet:', catError.message);
        } else {
          setCategories(catData || []);
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
        setCategoriesLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1023)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
      <Navbar session={session} />
      
      <main className="flex-1 w-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-[3px] w-full h-[160vh] md:h-[65vh] bg-white">
          
          <div className="relative overflow-hidden group h-[80vh] md:h-full">
            <img 
              src={teaserDesktop} 
              alt="Flowers for Society + Mammut collaboration desktop" 
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
            />
            <img 
              src={teaserMobile} 
              alt="Flowers for Society + Mammut collaboration mobile" 
              className="block md:hidden absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 flex flex-col items-start text-white select-none">
              <h2 className="text-2xl md:text-[36px] lg:text-[42px] font-bold uppercase tracking-normal leading-[1.08]">
                Flowers For <br className="hidden md:inline" /> Society + <br className="inline md:hidden" /> Mammut
              </h2>
              <p className="text-xs md:text-sm font-normal text-neutral-200 mt-4 max-w-sm md:max-w-md leading-relaxed">
                Discover the new drop of our limited-edition Flowers for Society collab. A new look for the Aenergy hiking shoes – for dawn to dusk.
              </p>
              
              <button className="mt-8 inline-flex items-center bg-white text-black font-extrabold uppercase tracking-[0.1em] text-[11px] md:text-xs select-none hover:bg-neutral-100 active:bg-neutral-200 transition-colors group cursor-pointer h-[54px] rounded-none shadow-sm">
                <span className="px-6 flex items-center justify-center h-full text-center whitespace-nowrap">
                  SHOP THE COLLAB
                </span>
                <span className="w-14 h-full border-l border-neutral-200 flex items-center justify-center text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden group h-[80vh] md:h-full">
            <img 
              src={trailRun} 
              alt="Trail running in Chamonix" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 flex flex-col items-start text-white select-none">
              <h2 className="text-3xl md:text-[36px] lg:text-[42px] font-bold uppercase tracking-normal leading-[1.08]">
                Heat? What heat
              </h2>
              <p className="text-xs md:text-sm font-normal text-neutral-200 mt-4 max-w-sm md:max-w-md leading-relaxed">
                Stay cool with breathable trail running clothing.
              </p>
              
              <button className="mt-8 inline-flex items-center bg-white text-black font-extrabold uppercase tracking-[0.1em] text-[11px] md:text-xs select-none hover:bg-neutral-100 active:bg-neutral-200 transition-colors group cursor-pointer h-[54px] rounded-none shadow-sm">
                <span className="px-6 flex items-center justify-center h-full text-center whitespace-nowrap">
                  DISCOVER TRAIL RUNNING GEAR
                </span>
                <span className="w-14 h-full border-l border-neutral-200 flex items-center justify-center text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>

        </div>

        <section className="bg-[#E6DFD5] mt-10 py-15 px-8 md:px-16 lg:px-12 flex flex-col items-start text-black w-full">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-black uppercase tracking-normal leading-tight font-display">
            A gift for you
          </h2>
          
          <p className="text-base md:text-lg font-normal text-neutral-800 mt-6 max-w-3xl leading-relaxed">
            Planning your summer adventures? <strong className="font-bold">Enjoy a free pair of Trail Running Targeted Cushion Crew socks with your next footwear purchase.</strong> <span className="inline-block hover:underline cursor-pointer font-medium">Read T&C* ↗</span>
          </p>

          <div className="mt-5 text-sm md:text-base text-neutral-800 space-y-1.5">
            <p className=" text-neutral-900 mb-2">Follow these steps to redeem the offer:</p>
            <p>1. Add any full price footwear product to your cart.</p>
            <p>2. Add one size of the free socks to your cart.</p>
            <p>3. Enjoy your gift!</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-8 w-full lg:w-auto">
            <button className="inline-flex items-center border border-black bg-transparent text-black font-extrabold uppercase tracking-[0.1em] text-[10px] lg:text-xs select-none hover:bg-black hover:text-white transition-all group cursor-pointer h-[42px] lg:h-[50px] rounded-none w-full max-w-[240px] lg:w-auto">
              <span className="px-4 lg:px-6 flex items-center justify-center h-full text-center whitespace-nowrap flex-1 lg:flex-initial">
                SHOP FOOTWEAR
              </span>
              <span className="w-10 lg:w-12 h-full border-l border-black flex items-center justify-center text-base lg:text-lg transition-transform group-hover:translate-x-1 flex-shrink-0">
                →
              </span>
            </button>

            <button className="inline-flex items-center border border-black bg-transparent text-black font-extrabold uppercase tracking-[0.1em] text-[10px] lg:text-xs select-none hover:bg-black hover:text-white transition-all group cursor-pointer h-[42px] lg:h-[50px] rounded-none w-full max-w-[240px] lg:w-auto">
              <span className="px-4 lg:px-6 flex items-center justify-center h-full text-center whitespace-nowrap flex-1 lg:flex-initial">
                GET YOUR SOCKS
              </span>
              <span className="w-10 lg:w-12 h-full border-l border-black flex items-center justify-center text-base lg:text-lg transition-transform group-hover:translate-x-1 flex-shrink-0">
                →
              </span>
            </button>
          </div>
        </section>

        <section className="bg-white px-4 md:px-8 lg:px-12 py-16 w-full flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-16 font-medium">
              Eroare la incarcarea produselor: {error}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-neutral-500 py-16">
              Nu s-au gasit produse.
            </div>
          ) : isDesktop ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={1.2}
              grabCursor={true}
              breakpoints={{
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 24,
                },
              }}
              className="w-full"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="pb-4">
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>

        <section className="bg-white px-4 md:px-8 lg:px-10 pb-5 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-[32px]  text-black font-sans leading-tight">
              Shop by category
            </h2>
            <div className="hidden lg:flex items-center gap-2">
              <button 
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 transition-all cursor-pointer shadow-sm"
                aria-label="Previous category"
              >
                <FiChevronLeft className="text-xl text-neutral-800" />
              </button>
              <button 
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 transition-all cursor-pointer shadow-sm"
                aria-label="Next category"
              >
                <FiChevronRight className="text-xl text-neutral-800" />
              </button>
            </div>
          </div>

          {categoriesLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center text-neutral-500 py-12">
              Nu s-au gasit categorii.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-1.5 gap-y-5 md:gap-x-2.5 md:gap-y-6 lg:hidden w-full">
                {categories.map((category) => (
                  <Link 
                    key={category.id} 
                    to={`/category/${category.slug}`} 
                    className="flex flex-col group cursor-pointer w-full text-black select-none"
                  >
                    <div className="relative aspect-[3/4] bg-[#ECECEC] w-full overflow-hidden rounded-none">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-bold text-[14px] md:text-[15px] text-neutral-900 mt-2 leading-snug tracking-tight group-hover:underline">
                      {category.name}
                    </h3>
                  </Link>
                ))}
              </div>

              <div className="hidden lg:block w-full">
                <Swiper
                  spaceBetween={12}
                  slidesPerView={4.8}
                  grabCursor={true}
                  onSwiper={(swiper) => { swiperRef.current = swiper; }}
                  className="w-full"
                >
                  {categories.map((category) => (
                    <SwiperSlide key={category.id}>
                      <Link 
                        to={`/category/${category.slug}`} 
                        className="flex flex-col group cursor-pointer w-full text-black select-none"
                      >
                        <div className="relative aspect-[3/4] bg-[#ECECEC] w-full overflow-hidden rounded-none">
                          <img
                            src={category.image_url}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="font-bold text-[15px] text-neutral-900 mt-2.5 leading-snug tracking-tight group-hover:underline">
                          {category.name}
                        </h3>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default Home
