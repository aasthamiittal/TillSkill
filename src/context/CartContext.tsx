import React, { createContext, useContext, useState } from 'react'

export type Course = {
  id: string
  title: string
  price: string
}

type CartContextValue = {
  items: Course[]
  addToCart: (course: Course) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Course[]>([])

  const addToCart = (course: Course) => {
    setItems((prev) => {
      if (prev.find((c) => c.id === course.id)) return prev
      return [...prev, course]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((c) => c.id !== id))
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider')
  }
  return ctx
}

