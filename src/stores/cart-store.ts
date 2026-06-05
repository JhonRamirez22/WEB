import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { CartItem } from "@/types"

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
  totalItems: number
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  syncWithServer: (items: CartItem[]) => void
  calculateTotals: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find(
          (i) => i.variantId === item.variantId
        )

        if (existingItem) {
          const updatedItems = currentItems.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
          set({ items: updatedItems })
        } else {
          set({ items: [...currentItems, item] })
        }
        get().calculateTotals()
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter((i) => i.variantId !== variantId),
        })
        get().calculateTotals()
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId)
          return
        }
        set({
          items: get().items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
        })
        get().calculateTotals()
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 })
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },

      syncWithServer: (items) => {
        set({ items })
        get().calculateTotals()
      },

      calculateTotals: () => {
        const items = get().items
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = items.reduce(
          (sum, item) => sum + item.quantity * item.variant.price,
          0
        )
        set({ totalItems, totalPrice })
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
)
