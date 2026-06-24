'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from './types'

interface CartStore {
  items: CartItem[]
  wishlist: string[] // product ids
  addToCart: (product: Product, colorIndex: number, storageIndex: number, qty?: number) => void
  removeFromCart: (productId: string, colorIndex: number, storageIndex: number) => void
  updateQty: (productId: string, colorIndex: number, storageIndex: number, delta: number) => void
  clearCart: () => void
  toggleWish: (productId: string) => void
  cartCount: () => number
  cartTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],

      addToCart: (product, colorIndex, storageIndex, qty = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.product.id === product.id &&
              i.colorIndex === colorIndex &&
              i.storageIndex === storageIndex
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + qty } : i
              ),
            }
          }
          return { items: [...state.items, { product, colorIndex, storageIndex, quantity: qty }] }
        })
      },

      removeFromCart: (productId, colorIndex, storageIndex) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.product.id === productId &&
                i.colorIndex === colorIndex &&
                i.storageIndex === storageIndex
              )
          ),
        }))
      },

      updateQty: (productId, colorIndex, storageIndex, delta) => {
        set((state) => ({
          items: state.items
            .map((i) =>
              i.product.id === productId &&
              i.colorIndex === colorIndex &&
              i.storageIndex === storageIndex
                ? { ...i, quantity: Math.max(1, i.quantity + delta) }
                : i
            )
            .filter((i) => i.quantity > 0),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleWish: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        }))
      },

      cartCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      cartTotal: () =>
        get().items.reduce((sum, i) => {
          const price = i.product.storages[i.storageIndex]?.price ?? i.product.price
          return sum + price * i.quantity
        }, 0),
    }),
    { name: 'dutu-cart' }
  )
)
