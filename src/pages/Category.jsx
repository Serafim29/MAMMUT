import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

function Category({ session }) {
  const { slug } = useParams()
  
  const [activeCategory, setActiveCategory] = useState(null)
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [pills, setPills] = useState([])
  const [viewAllCategory, setViewAllCategory] = useState(null)
  const [products, setProducts] = useState([])
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedGender, setSelectedGender] = useState('All genders')
  const [selectedSizes, setSelectedSizes] = useState([])
  const [sortBy, setSortBy] = useState('recommend')
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        setLoading(true)
        setError(null)

        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('*')
          .eq('slug', slug)
          .single()

        if (catError) throw catError
        setActiveCategory(catData)

        let current = catData
        const trail = [current]
        while (current.parent_id) {
          const { data: parentData } = await supabase
            .from('categories')
            .select('*')
            .eq('id', current.parent_id)
            .single()
          
          if (parentData) {
            trail.unshift(parentData)
            current = parentData
          } else {
            break
          }
        }
        setBreadcrumbs(trail)

        const { data: children } = await supabase
          .from('categories')
          .select('*')
          .eq('parent_id', catData.id)
          .order('display_order', { ascending: true })

        if (children && children.length > 0) {
          setPills(children)
          setViewAllCategory(catData)
        } else if (catData.parent_id) {
          const { data: parent } = await supabase
            .from('categories')
            .select('*')
            .eq('id', catData.parent_id)
            .single()

          if (parent) {
            setViewAllCategory(parent)
            const { data: siblings } = await supabase
              .from('categories')
              .select('*')
              .eq('parent_id', parent.id)
              .order('display_order', { ascending: true })
            setPills(siblings || [])
          }
        } else {
          setPills([])
          setViewAllCategory(null)
        }

        const descendantIds = [catData.id]
        
        const { data: level1 } = await supabase
          .from('categories')
          .select('id')
          .eq('parent_id', catData.id)
        
        if (level1 && level1.length > 0) {
          const level1Ids = level1.map(c => c.id)
          descendantIds.push(...level1Ids)
          
          const { data: level2 } = await supabase
            .from('categories')
            .select('id')
            .in('parent_id', level1Ids)
          
          if (level2 && level2.length > 0) {
            descendantIds.push(...level2.map(c => c.id))
          }
        }

        const { data: prodData, error: prodError } = await supabase
          .from('products')
          .select('*')
          .in('category_id', descendantIds)
        
        if (prodError) throw prodError
        setProducts(prodData || [])

      } catch (err) {
        console.error('Error loading category:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchCategoryData()
    }
  }, [slug])

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  let filteredProducts = [...products]

  if (selectedGender !== 'All genders') {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(selectedGender.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(selectedGender.toLowerCase()) ||
      p.description?.toLowerCase().includes(selectedGender.toLowerCase())
    )
  }

  if (selectedSizes.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      const productSizes = p.variants?.flatMap(v => v.sizes || []) || []
      return selectedSizes.some(sz => productSizes.includes(sz))
    })
  }

  if (sortBy === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
        <Navbar session={session} />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </main>
      </div>
    )
  }

  if (error || !activeCategory) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
        <Navbar session={session} />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-red-500">Error Loading Category</h1>
          <p className="text-neutral-600 mt-2">{error || 'Category not found'}</p>
          <Link to="/" className="mt-6 border border-black px-6 py-2.5 hover:bg-black hover:text-white transition-all text-xs font-bold tracking-widest uppercase">
            Back to Home
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
      <Navbar session={session} />
      
      <main className="flex-1 w-full bg-white px-4 md:px-8 lg:px-12 py-10 flex flex-col">
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 select-none">
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.id} className="flex items-center gap-1.5">
              {idx > 0 && <span>&gt;</span>}
              <Link 
                to={`/category/${crumb.slug}`} 
                className={`transition-colors ${idx === breadcrumbs.length - 1 ? 'text-neutral-500' : 'hover:text-black'}`}
              >
                {crumb.name}
              </Link>
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-[44px] font-bold tracking-tight text-black mb-8 leading-none select-none">
          {activeCategory.name}
        </h1>

        {pills.length > 0 && (
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-8 mb-8 overflow-x-auto whitespace-nowrap scrollbar-none select-none w-full">
            {viewAllCategory && (
              <Link
                to={`/category/${viewAllCategory.slug}`}
                className={`px-5 py-3 border text-[13px] font-bold transition-all flex items-center justify-center h-[52px] ${
                  activeCategory.id === viewAllCategory.id
                    ? 'border-black bg-black text-white font-extrabold'
                    : 'border-neutral-200 bg-white text-black hover:border-neutral-400 font-bold'
                }`}
              >
                View All
              </Link>
            )}
            {pills.map((pill) => (
              <Link
                key={pill.id}
                to={`/category/${pill.slug}`}
                className={`px-5 py-3 border text-[13px] transition-all flex items-center gap-3 h-[52px] ${
                  activeCategory.id === pill.id
                    ? 'border-black bg-black text-white font-extrabold'
                    : 'border-neutral-200 bg-white text-black hover:border-neutral-400 font-bold'
                }`}
              >
                {pill.image_url && (
                  <img src={pill.image_url} alt="" className="w-6 h-6 object-cover rounded-full bg-neutral-100 border border-neutral-200 flex-shrink-0" />
                )}
                {pill.name}
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
          
          <aside className={`w-full lg:w-[240px] flex-shrink-0 flex flex-col gap-8 select-none ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
            
            <div className="border-y border-neutral-200 py-4 flex items-center justify-between">
              <button 
                onClick={() => setShowFiltersMobile(false)}
                className="lg:hidden text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black cursor-pointer"
              >
                ← Close Filters
              </button>
              <span className="hidden lg:inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-black">
                Hide Filters
              </span>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                {filteredProducts.length} Results
              </span>
            </div>

            <div className="border-b border-neutral-200 pb-6">
              <h4 className="font-extrabold text-[12px] uppercase tracking-wider mb-4 text-black">Gender</h4>
              <div className="flex flex-col gap-3">
                {['All genders', 'Men', 'Women'].map((gender) => (
                  <label key={gender} className="flex items-center gap-3 cursor-pointer group text-[13px] font-semibold text-neutral-800 hover:text-black">
                    <input
                      type="radio"
                      name="gender"
                      checked={selectedGender === gender}
                      onChange={() => setSelectedGender(gender)}
                      className="w-4 h-4 accent-black cursor-pointer border border-neutral-300 rounded-full"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-b border-neutral-200 pb-6">
              <h4 className="font-extrabold text-[12px] uppercase tracking-wider mb-4 text-black">Clothing Sizes</h4>
              <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto pr-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <label key={size} className="flex items-center gap-3 cursor-pointer group text-[13px] font-semibold text-neutral-800 hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeToggle(size)}
                      className="w-4 h-4 accent-black cursor-pointer rounded-none border border-neutral-300"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1 w-full">
            
            <div className="lg:hidden flex items-center justify-between border-y border-neutral-200 py-3 mb-6">
              <button 
                onClick={() => setShowFiltersMobile(true)}
                className="text-xs font-extrabold uppercase tracking-widest text-black border border-black px-5 py-2.5 hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                Filters
              </button>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                {filteredProducts.length} Results
              </span>
            </div>

            <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Showing {filteredProducts.length} items
              </span>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="text-neutral-400">Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-b border-black py-0.5 pr-6 font-extrabold focus:outline-none cursor-pointer"
                >
                  <option value="recommend">Our Recommendation</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-neutral-500 font-medium border border-dashed border-neutral-200">
                Nu s-au gasit produse pentru filtrele selectate.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Category
