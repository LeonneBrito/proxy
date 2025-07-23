// store/use-cart-store.ts
import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { fixedDiscountMap } from '@/utils/discount-config'

interface SecureContact {
  name: string
  number: string
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  secureContact: SecureContact
  setSecureContact: (value: SecureContact) => void
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateCartItem: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      secureContact: { name: '', number: '' },
      setSecureContact: (value) => set({ secureContact: value }),
      cart: [],
      addToCart: (item, quantity = 1) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id)
          const newQuantity = existing ? existing.quantity + quantity : quantity

          const gangKey =
            typeof window !== 'undefined' ? localStorage.getItem('gang') : null

          const cyberLimits: Record<string, number> = {
            PENDRIVE_SUMMERELETROHITS_2025: 2,
            NOTEBOOK_GAMER_ATM_EDITION: 1,
            LAPTOP_CARRO_FORTE_EDITION: 1,
          }

          if (gangKey === 'cyberdystopia' && cyberLimits[item.name]) {
            const current = existing ? existing.quantity : 0
            const allowed = cyberLimits[item.name]

            if (current + quantity > allowed) {
              toast.error(
                `Limite atingido para ${item.name}. Máximo permitido: ${allowed} unidade(s) para Cyber Dystopia.`,
              )
              return state
            }
          }

          const productMap =
            fixedDiscountMap[item.name as keyof typeof fixedDiscountMap]
          let price = item.price

          if (productMap) {
            const isAlly = item.price === productMap.ally[1]
            const priceMap = isAlly ? productMap.ally : productMap.notAlly
            const applicableQuantity = Math.min(newQuantity, 5)
            price = priceMap[applicableQuantity] ?? item.price
          }

          const updatedItem = { ...item, price }

          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: newQuantity, price } : i,
              ),
            }
          }

          return {
            cart: [...state.cart, { ...updatedItem, quantity }],
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      updateCartItem: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        })),
      clearCart: () =>
        set({ cart: [], secureContact: { name: '', number: '' } }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cart: state.cart,
        secureContact: state.secureContact,
      }),
    },
  ),
)
