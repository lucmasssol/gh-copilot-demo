import { ref, computed, watch } from 'vue'
import type { Album } from '../types/album'
import type { CartItem } from '../types/cart'

const CART_STORAGE_KEY = 'album-cart'

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const items = JSON.parse(stored) as Array<Omit<CartItem, 'addedAt'> & { addedAt: string }>
      // Convert addedAt strings back to Date objects
      return items.map((item) => ({
        ...item,
        addedAt: new Date(item.addedAt)
      }))
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
  }
  return []
}

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

// Global cart state
const cartItems = ref<CartItem[]>(loadCartFromStorage())

// Watch for changes and persist to localStorage
watch(cartItems, (newItems) => {
  saveCartToStorage(newItems)
}, { deep: true })

export function useCart() {
  const itemCount = computed(() => cartItems.value.length)
  
  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price, 0)
  })

  const addToCart = (album: Album): boolean => {
    // Check if album already exists in cart
    const exists = cartItems.value.some(item => item.id === album.id)
    
    if (exists) {
      return false // Already in cart
    }

    const cartItem: CartItem = {
      id: album.id,
      title: album.title,
      artist: album.artist,
      image_url: album.image_url,
      price: album.price,
      addedAt: new Date()
    }

    cartItems.value.push(cartItem)
    return true // Successfully added
  }

  const removeFromCart = (itemId: number): void => {
    const index = cartItems.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const isInCart = (albumId: number): boolean => {
    return cartItems.value.some(item => item.id === albumId)
  }

  const clearCart = (): void => {
    cartItems.value = []
  }

  return {
    cartItems: computed(() => cartItems.value),
    itemCount,
    totalPrice,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart
  }
}
