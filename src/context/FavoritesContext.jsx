import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const FavoritesContext = createContext()

export function FavoritesProvider({ children, session }) {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFavorites() {
      setLoading(true)
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from('favorites')
            .select('product_id, products(*)')
          
          if (error) throw error

          const dbFavorites = (data || [])
            .filter(item => item.products !== null)
            .map(item => item.products)

          const localData = localStorage.getItem('mammut_favorites')
          if (localData) {
            const localFavs = JSON.parse(localData)
            if (localFavs.length > 0) {
              const syncItems = localFavs.map(prod => ({
                user_id: session.user.id,
                product_id: prod.id
              }))

              const { error: syncError } = await supabase
                .from('favorites')
                .upsert(syncItems, { onConflict: 'user_id,product_id' })

              if (!syncError) {
                const { data: updatedData } = await supabase
                  .from('favorites')
                  .select('product_id, products(*)')
                
                const updatedFavs = (updatedData || [])
                  .filter(item => item.products !== null)
                  .map(item => item.products)
                
                setFavorites(updatedFavs)
                localStorage.removeItem('mammut_favorites')
              } else {
                setFavorites(dbFavorites)
              }
            } else {
              setFavorites(dbFavorites)
            }
          } else {
            setFavorites(dbFavorites)
          }
        } catch (err) {
          console.error('Error loading favorites from Supabase:', err)
        }
      } else {
        const localData = localStorage.getItem('mammut_favorites')
        if (localData) {
          setFavorites(JSON.parse(localData))
        } else {
          setFavorites([])
        }
      }
      setLoading(false)
    }

    loadFavorites()
  }, [session])

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId)
  }

  const toggleFavorite = async (product) => {
    if (!product || !product.id) return

    const exists = isFavorite(product.id)

    if (session?.user) {
      try {
        if (exists) {
          const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', session.user.id)
            .eq('product_id', product.id)

          if (error) throw error

          setFavorites(prev => prev.filter(item => item.id !== product.id))
        } else {
          const { error } = await supabase
            .from('favorites')
            .insert({
              user_id: session.user.id,
              product_id: product.id
            })

          if (error) throw error

          setFavorites(prev => [...prev, product])
        }
      } catch (err) {
        console.error('Error toggling favorite in Supabase:', err)
      }
    } else {
      let updatedFavs = []
      if (exists) {
        updatedFavs = favorites.filter(item => item.id !== product.id)
      } else {
        updatedFavs = [...favorites, product]
      }
      setFavorites(updatedFavs)
      localStorage.setItem('mammut_favorites', JSON.stringify(updatedFavs))
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, loading, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
