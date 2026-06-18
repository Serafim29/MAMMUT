import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const CartContext = createContext()

export function CartProvider({ children, session }) {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCart() {
      setLoading(true)
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from('cart_items')
            .select('*, product:products(*)')
          
          if (error) throw error

          const dbCart = (data || [])
            .filter(item => item.product !== null)

          const localData = localStorage.getItem('mammut_cart')
          if (localData) {
            const localCart = JSON.parse(localData)
            if (localCart.length > 0) {
              const syncItems = localCart.map(item => ({
                user_id: session.user.id,
                product_id: item.product_id,
                color_name: item.color_name,
                size: item.size,
                quantity: item.quantity
              }))

              const { error: syncError } = await supabase
                .from('cart_items')
                .upsert(syncItems, { onConflict: 'user_id,product_id,color_name,size' })

              if (!syncError) {
                const { data: updatedData } = await supabase
                  .from('cart_items')
                  .select('*, product:products(*)')
                
                const updatedCart = (updatedData || [])
                  .filter(item => item.product !== null)
                
                setCart(updatedCart)
                localStorage.removeItem('mammut_cart')
              } else {
                console.error('Error syncing local cart to Supabase:', syncError.message)
                setCart(dbCart)
              }
            } else {
              setCart(dbCart)
            }
          } else {
            setCart(dbCart)
          }
        } catch (err) {
          console.error('Error loading cart from Supabase:', err)
        }
      } else {
        const localData = localStorage.getItem('mammut_cart')
        if (localData) {
          setCart(JSON.parse(localData))
        } else {
          setCart([])
        }
      }
      setLoading(false)
    }

    loadCart()
  }, [session])

  const findItemIndex = (productId, colorName, size) => {
    return cart.findIndex(
      item => item.product_id === productId && item.color_name === colorName && item.size === size
    )
  }

  const addToCart = async (product, colorName, size, quantity = 1) => {
    if (!product || !product.id) return

    if (session?.user) {
      try {
        const existingItem = cart.find(
          item => item.product_id === product.id && item.color_name === colorName && item.size === size
        )

        if (existingItem) {
          const newQty = existingItem.quantity + quantity
          const { error } = await supabase
            .from('cart_items')
            .update({ quantity: newQty })
            .eq('id', existingItem.id)

          if (error) throw error

          setCart(prev =>
            prev.map(item =>
              item.id === existingItem.id ? { ...item, quantity: newQty } : item
            )
          )
        } else {
          const { data, error } = await supabase
            .from('cart_items')
            .insert({
              user_id: session.user.id,
              product_id: product.id,
              color_name: colorName,
              size: size,
              quantity: quantity
            })
            .select('*, product:products(*)')
            .single()

          if (error) throw error

          if (data) {
            setCart(prev => [...prev, data])
          }
        }
      } catch (err) {
        console.error('Error adding to cart in Supabase:', err)
      }
    } else {
      const existingIdx = findItemIndex(product.id, colorName, size)
      let updatedCart = [...cart]

      if (existingIdx > -1) {
        updatedCart[existingIdx].quantity += quantity
      } else {
        const tempId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        updatedCart.push({
          id: tempId,
          product_id: product.id,
          color_name: colorName,
          size: size,
          quantity: quantity,
          product: product
        })
      }

      setCart(updatedCart)
      localStorage.setItem('mammut_cart', JSON.stringify(updatedCart))
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return

    const itemToUpdate = cart.find(item => item.id === itemId)
    if (!itemToUpdate) return

    if (session?.user && !itemId.toString().startsWith('local_')) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId)

        if (error) throw error

        setCart(prev =>
          prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
        )
      } catch (err) {
        console.error('Error updating cart quantity in Supabase:', err)
      }
    } else {
      const updatedCart = cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
      setCart(updatedCart)
      localStorage.setItem('mammut_cart', JSON.stringify(updatedCart))
    }
  }

  const removeFromCart = async (itemId) => {
    const itemToRemove = cart.find(item => item.id === itemId)
    if (!itemToRemove) return

    if (session?.user && !itemId.toString().startsWith('local_')) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId)

        if (error) throw error

        setCart(prev => prev.filter(item => item.id !== itemId))
      } catch (err) {
        console.error('Error removing from cart in Supabase:', err)
      }
    } else {
      const updatedCart = cart.filter(item => item.id !== itemId)
      setCart(updatedCart)
      localStorage.setItem('mammut_cart', JSON.stringify(updatedCart))
    }
  }

  const clearCart = async () => {
    if (session?.user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', session.user.id)

        if (error) throw error
        setCart([])
      } catch (err) {
        console.error('Error clearing cart in Supabase:', err)
      }
    } else {
      setCart([])
      localStorage.removeItem('mammut_cart')
    }
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const cartTotal = cart.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, loading, cartCount, cartTotal, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
