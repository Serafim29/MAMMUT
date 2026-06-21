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
  const [selectedLengths, setSelectedLengths] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedActivities, setSelectedActivities] = useState([])
  const [selectedCollections, setSelectedCollections] = useState([])
  const [sortBy, setSortBy] = useState('recommend')
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const [showMorePants, setShowMorePants] = useState(false)
  const [showMoreAccessories, setShowMoreAccessories] = useState(false)

  const [openSections, setOpenSections] = useState({
    gender: true,
    sizes: true,
    bottomLengths: false,
    colors: false,
    activity: false,
    collection: false
  })

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleSizeToggle = (sizeKey) => {
    setSelectedSizes(prev => 
      prev.includes(sizeKey) ? prev.filter(s => s !== sizeKey) : [...prev, sizeKey]
    )
  }

  const handleLengthToggle = (length) => {
    setSelectedLengths(prev => 
      prev.includes(length) ? prev.filter(l => l !== length) : [...prev, length]
    )
  }

  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const handleActivityToggle = (act) => {
    setSelectedActivities(prev => 
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    )
  }

  const handleCollectionToggle = (coll) => {
    setSelectedCollections(prev => 
      prev.includes(coll) ? prev.filter(c => c !== coll) : [...prev, coll]
    )
  }

  const getProductGroup = (p) => {
    const sub = (p.subcategory || '').toLowerCase()
    const name = (p.name || '').toLowerCase()
    if (sub.includes('jacket') || sub.includes('vest') || name.includes('jacket') || name.includes('vest')) {
      return 'Jackets & Vests'
    }
    if (sub.includes('top') || sub.includes('shirt') || sub.includes('hoodie') || sub.includes('sweater') || sub.includes('midlayer') ||
        name.includes('top') || name.includes('shirt') || name.includes('hoodie') || name.includes('sweater') || name.includes('midlayer')) {
      return 'Tops'
    }
    if (sub.includes('pants') || sub.includes('shorts') || sub.includes('leggings') || sub.includes('tights') ||
        name.includes('pants') || name.includes('shorts') || name.includes('leggings') || name.includes('tights')) {
      return 'Pants & Shorts'
    }
    return 'Accessories'
  }

  const sizeCounts = {
    'Jackets & Vests': {},
    'Tops': {},
    'Pants & Shorts': {},
    'Accessories': {}
  }
  const colorCounts = {}
  const lengthCounts = { 'Short': 0, 'Regular': 0, 'Long': 0 }
  const activityCounts = { 'Hiking': 0, 'Climbing': 0, 'Mountaineering': 0, 'Snowsports': 0, 'Trail Running': 0, 'Everyday': 0 }
  const collectionCounts = { 'Eiger Extreme': 0, 'Mountain Pro': 0, 'Runbold': 0, 'Aenergy': 0, 'Crater': 0 }

  let genderFilteredProducts = [...products]
  if (selectedGender !== 'All genders') {
    genderFilteredProducts = genderFilteredProducts.filter(p => 
      p.name.endsWith(` ${selectedGender}`) ||
      p.name.toLowerCase().includes(` ${selectedGender.toLowerCase()}`) ||
      p.subtitle?.toLowerCase().includes(` ${selectedGender.toLowerCase()}`)
    )
  }

  genderFilteredProducts.forEach(p => {
    const group = getProductGroup(p)
    const pSizes = p.variants?.flatMap(v => v.sizes || []) || []
    pSizes.forEach(sz => {
      sizeCounts[group][sz] = (sizeCounts[group][sz] || 0) + 1
    })

    const pColors = p.variants?.map(v => v.color_name).filter(Boolean) || []
    const uniqueColors = [...new Set(pColors)]
    uniqueColors.forEach(color => {
      colorCounts[color] = (colorCounts[color] || 0) + 1
    })

    const desc = (p.description || '').toLowerCase()
    const pName = (p.name || '').toLowerCase()
    if (desc.includes('short') || pName.includes('short')) {
      lengthCounts['Short']++
    } else if (desc.includes('long') || pName.includes('long')) {
      lengthCounts['Long']++
    } else {
      lengthCounts['Regular']++
    }

    const sub = (p.subcategory || '').toLowerCase()
    if (desc.includes('hike') || desc.includes('trek') || sub.includes('hike') || pName.includes('hike')) {
      activityCounts['Hiking']++
    }
    if (desc.includes('climb') || sub.includes('climbing') || pName.includes('climb')) {
      activityCounts['Climbing']++
    }
    if (desc.includes('mountaineer') || desc.includes('alpine') || pName.includes('mountaineer')) {
      activityCounts['Mountaineering']++
    }
    if (desc.includes('ski') || desc.includes('snow') || desc.includes('winter') || pName.includes('ski')) {
      activityCounts['Snowsports']++
    }
    if (desc.includes('trail') || desc.includes('run') || pName.includes('run')) {
      activityCounts['Trail Running']++
    }
    if (desc.includes('everyday') || desc.includes('urban') || desc.includes('casual') || pName.includes('everyday')) {
      activityCounts['Everyday']++
    }

    if (desc.includes('eiger') || pName.includes('eiger')) {
      collectionCounts['Eiger Extreme']++
    }
    if (desc.includes('mountain pro') || pName.includes('mountain pro')) {
      collectionCounts['Mountain Pro']++
    }
    if (desc.includes('runbold') || pName.includes('runbold')) {
      collectionCounts['Runbold']++
    }
    if (desc.includes('aenergy') || pName.includes('aenergy')) {
      collectionCounts['Aenergy']++
    }
    if (desc.includes('crater') || pName.includes('crater')) {
      collectionCounts['Crater']++
    }
  })

  let filteredProducts = [...products]

  if (selectedGender !== 'All genders') {
    filteredProducts = filteredProducts.filter(p => 
      p.name.endsWith(` ${selectedGender}`) ||
      p.name.toLowerCase().includes(` ${selectedGender.toLowerCase()}`) ||
      p.subtitle?.toLowerCase().includes(` ${selectedGender.toLowerCase()}`)
    )
  }

  if (selectedSizes.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      const productSizes = p.variants?.flatMap(v => v.sizes || []) || []
      return selectedSizes.some(sz => {
        const sizeVal = sz.includes(':') ? sz.split(':')[1] : sz
        return productSizes.includes(sizeVal)
      })
    })
  }

  if (selectedLengths.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      const desc = (p.description || '').toLowerCase()
      const pName = (p.name || '').toLowerCase()
      return selectedLengths.some(length => {
        if (length === 'Short') return desc.includes('short') || pName.includes('short')
        if (length === 'Long') return desc.includes('long') || pName.includes('long')
        if (length === 'Regular') return !desc.includes('short') && !pName.includes('short') && !desc.includes('long') && !pName.includes('long')
        return false
      })
    })
  }

  if (selectedColors.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      const pColors = p.variants?.map(v => v.color_name).filter(Boolean) || []
      return pColors.some(color => selectedColors.includes(color))
    })
  }

  if (selectedActivities.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      const desc = (p.description || '').toLowerCase()
      const sub = (p.subcategory || '').toLowerCase()
      const pName = (p.name || '').toLowerCase()
      return selectedActivities.some(act => {
        if (act === 'Hiking') return desc.includes('hike') || desc.includes('trek') || sub.includes('hike') || pName.includes('hike')
        if (act === 'Climbing') return desc.includes('climb') || sub.includes('climbing') || pName.includes('climb')
        if (act === 'Mountaineering') return desc.includes('mountaineer') || desc.includes('alpine') || pName.includes('mountaineer')
        if (act === 'Snowsports') return desc.includes('ski') || desc.includes('snow') || desc.includes('winter') || pName.includes('ski')
        if (act === 'Trail Running') return desc.includes('trail') || desc.includes('run') || pName.includes('run')
        if (act === 'Everyday') return desc.includes('everyday') || desc.includes('urban') || desc.includes('casual') || pName.includes('everyday')
        return false
      })
    })
  }

  if (selectedCollections.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      const desc = (p.description || '').toLowerCase()
      const pName = (p.name || '').toLowerCase()
      return selectedCollections.some(coll => {
        return desc.includes(coll.toLowerCase()) || pName.includes(coll.toLowerCase())
      })
    })
  }

  if (sortBy === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price)
  }

  const renderSizeSubgroup = (groupName, allSizes, showMoreState = null, setShowMoreState = null) => {
    const counts = sizeCounts[groupName] || {}
    const visibleSizes = (showMoreState !== null && !showMoreState) 
      ? allSizes.slice(0, 5) 
      : allSizes;
      
    return (
      <div className="flex flex-col gap-3">
        <h5 className="font-extrabold text-[12px] text-neutral-900 uppercase tracking-wider">{groupName}</h5>
        <div className="flex flex-col gap-3">
          {visibleSizes.map((size) => {
            const key = `${groupName}:${size}`
            const count = counts[size] || 0
            return (
              <label key={size} className="flex items-center gap-3 cursor-pointer group text-[13px] font-semibold text-neutral-700 hover:text-black">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(key)}
                  onChange={() => handleSizeToggle(key)}
                  className="w-4 h-4 accent-black cursor-pointer rounded-none border border-neutral-300"
                />
                <span className="flex-1">{size}</span>
                <span className="text-neutral-400 text-xs font-normal">({count})</span>
              </label>
            )
          })}
        </div>
        {showMoreState !== null && allSizes.length > 5 && (
          <button 
            onClick={() => setShowMoreState(!showMoreState)}
            className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 hover:text-black underline mt-1 text-left cursor-pointer"
          >
            {showMoreState ? 'SHOW LESS' : 'SHOW MORE'}
          </button>
        )}
      </div>
    )
  }

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
          
          {(showFilters || showFiltersMobile) && (
            <aside 
              className={`w-full lg:w-[240px] flex-shrink-0 flex flex-col gap-6 select-none ${
                showFiltersMobile 
                  ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block' 
                  : 'hidden lg:flex'
              }`}
            >
              <div className="border-y border-neutral-200 py-4 flex items-center justify-between lg:hidden">
                <button 
                  onClick={() => setShowFiltersMobile(false)}
                  className="text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black cursor-pointer"
                >
                  ← Close Filters
                </button>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                  {filteredProducts.length} Results
                </span>
              </div>

              <div className="border-b border-neutral-200 pb-5">
                <div 
                  onClick={() => toggleSection('gender')}
                  className="flex items-center justify-between cursor-pointer py-2 group select-none"
                >
                  <h4 className="font-extrabold text-[12px] uppercase tracking-wider text-black group-hover:text-neutral-600 transition-colors">Gender</h4>
                  <span className="text-xs font-bold text-neutral-500">{openSections.gender ? '--' : '+'}</span>
                </div>
                
                {openSections.gender && (
                  <div className="flex flex-col gap-3 mt-3 animate-in fade-in duration-200">
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
                )}
              </div>

              <div className="border-b border-neutral-200 pb-5">
                <div 
                  onClick={() => toggleSection('sizes')}
                  className="flex items-center justify-between cursor-pointer py-2 group select-none"
                >
                  <h4 className="font-extrabold text-[12px] uppercase tracking-wider text-black group-hover:text-neutral-600 transition-colors">Clothing Sizes</h4>
                  <span className="text-xs font-bold text-neutral-500">{openSections.sizes ? '--' : '+'}</span>
                </div>
                
                {openSections.sizes && (
                  <div className="flex flex-col gap-6 mt-4 animate-in fade-in duration-200">
                    {renderSizeSubgroup('Jackets & Vests', ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'])}
                    {renderSizeSubgroup('Tops', ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'])}
                    {renderSizeSubgroup('Pants & Shorts', ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'], showMorePants, setShowMorePants)}
                    {renderSizeSubgroup('Accessories', ['6', '7', '8', '9', '10', '11', '12'], showMoreAccessories, setShowMoreAccessories)}
                  </div>
                )}
              </div>

              <div className="border-b border-neutral-200 pb-5">
                <div 
                  onClick={() => toggleSection('bottomLengths')}
                  className="flex items-center justify-between cursor-pointer py-2 group select-none"
                >
                  <h4 className="font-extrabold text-[12px] uppercase tracking-wider text-black group-hover:text-neutral-600 transition-colors">Bottom lengths</h4>
                  <span className="text-xs font-bold text-neutral-500">{openSections.bottomLengths ? '--' : '+'}</span>
                </div>
                
                {openSections.bottomLengths && (
                  <div className="flex flex-col gap-3 mt-3 animate-in fade-in duration-200">
                    {['Short', 'Regular', 'Long'].map(length => {
                      const count = lengthCounts[length] || 0
                      const isChecked = selectedLengths.includes(length)
                      return (
                        <label key={length} className="flex items-center gap-3 cursor-pointer group text-[13px] font-semibold text-neutral-700 hover:text-black">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleLengthToggle(length)}
                            className="w-4 h-4 accent-black cursor-pointer rounded-none border border-neutral-300"
                          />
                          <span className="flex-1">{length}</span>
                          <span className="text-neutral-400 text-xs font-normal">({count})</span>
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="border-b border-neutral-200 pb-5">
                <div 
                  onClick={() => toggleSection('colors')}
                  className="flex items-center justify-between cursor-pointer py-2 group select-none"
                >
                  <h4 className="font-extrabold text-[12px] uppercase tracking-wider text-black group-hover:text-neutral-600 transition-colors">Colors</h4>
                  <span className="text-xs font-bold text-neutral-500">{openSections.colors ? '--' : '+'}</span>
                </div>
                
                {openSections.colors && (
                  <div className="flex flex-col gap-3 mt-3 animate-in fade-in duration-200 max-h-[220px] overflow-y-auto pr-1">
                    {Object.keys(colorCounts).length === 0 ? (
                      <div className="text-xs text-neutral-400 italic">No colors available</div>
                    ) : (
                      Object.entries(colorCounts).map(([color, count]) => {
                        const isChecked = selectedColors.includes(color)
                        return (
                          <label key={color} className="flex items-center gap-3 cursor-pointer group text-[13px] font-semibold text-neutral-700 hover:text-black">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleColorToggle(color)}
                              className="w-4 h-4 accent-black cursor-pointer rounded-none border border-neutral-300"
                            />
                            <span className="flex-1">{color}</span>
                            <span className="text-neutral-400 text-xs font-normal">({count})</span>
                          </label>
                        )
                      })
                    )}
                  </div>
                )}
              </div>

              <div className="border-b border-neutral-200 pb-5">
                <div 
                  onClick={() => toggleSection('activity')}
                  className="flex items-center justify-between cursor-pointer py-2 group select-none"
                >
                  <h4 className="font-extrabold text-[12px] uppercase tracking-wider text-black group-hover:text-neutral-600 transition-colors">Activity</h4>
                  <span className="text-xs font-bold text-neutral-500">{openSections.activity ? '--' : '+'}</span>
                </div>
                
                {openSections.activity && (
                  <div className="flex flex-col gap-3 mt-3 animate-in fade-in duration-200">
                    {Object.entries(activityCounts).map(([act, count]) => {
                      const isChecked = selectedActivities.includes(act)
                      return (
                        <label key={act} className="flex items-center gap-3 cursor-pointer group text-[13px] font-semibold text-neutral-700 hover:text-black">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleActivityToggle(act)}
                            className="w-4 h-4 accent-black cursor-pointer rounded-none border border-neutral-300"
                          />
                          <span className="flex-1">{act}</span>
                          <span className="text-neutral-400 text-xs font-normal">({count})</span>
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="border-b border-neutral-200 pb-5">
                <div 
                  onClick={() => toggleSection('collection')}
                  className="flex items-center justify-between cursor-pointer py-2 group select-none"
                >
                  <h4 className="font-extrabold text-[12px] uppercase tracking-wider text-black group-hover:text-neutral-600 transition-colors">Collection</h4>
                  <span className="text-xs font-bold text-neutral-500">{openSections.collection ? '--' : '+'}</span>
                </div>
                
                {openSections.collection && (
                  <div className="flex flex-col gap-3 mt-3 animate-in fade-in duration-200">
                    {Object.entries(collectionCounts).map(([coll, count]) => {
                      const isChecked = selectedCollections.includes(coll)
                      return (
                        <label key={coll} className="flex items-center gap-3 cursor-pointer group text-[13px] font-semibold text-neutral-700 hover:text-black">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCollectionToggle(coll)}
                            className="w-4 h-4 accent-black cursor-pointer rounded-none border border-neutral-300"
                          />
                          <span className="flex-1">{coll}</span>
                          <span className="text-neutral-400 text-xs font-normal">({count})</span>
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>
            </aside>
          )}

          <div className="flex-1 w-full animate-in fade-in duration-300">
            
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
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2.5 border border-neutral-300 px-6 py-3.5 hover:bg-neutral-50 transition-colors text-[10px] font-extrabold uppercase tracking-widest text-black cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-neutral-800" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM9.05 3a2.5 2.5 0 014.9 0H15a.5.5 0 010 1h-1.05a2.5 2.5 0 01-4.9 0H1a.5.5 0 010-1h8.05zM4.5 7a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM2.05 8a2.5 2.5 0 014.9 0H15a.5.5 0 010 1H6.95a2.5 2.5 0 01-4.9 0H1a.5.5 0 010-1h1.05zm9.5 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-2.45 1a2.5 2.5 0 014.9 0H15a.5.5 0 010 1h-1.05a2.5 2.5 0 01-4.9 0H1a.5.5 0 010-1h8.05z" clipRule="evenodd" />
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-800">
                <span className="text-[#E30613] font-extrabold mr-1">{filteredProducts.length}</span> Results
              </div>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="text-neutral-400">Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-b border-black py-0.5 pr-6 font-extrabold focus:outline-none cursor-pointer uppercase"
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
              <div 
                className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12 transition-all duration-300 ${
                  showFilters ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'
                }`}
              >
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
