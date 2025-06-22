'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product } from '@/types/product'

interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, selectedColor?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product, selectedColor?: string) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id && item.selectedColor === selectedColor
      )

      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prevItems, { product, quantity: 1, selectedColor }]
    })
  }

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price.min * item.quantity), 0)
  }

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
