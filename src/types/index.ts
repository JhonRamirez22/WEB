import { UserRole } from "@prisma/client"

export interface CartItem {
  id: string
  perfumeId: string
  variantId: string
  quantity: number
  perfume: {
    id: string
    name: string
    slug: string
    brand: {
      name: string
    }
  }
  variant: {
    id: string
    sizeMl: number
    price: number
    imageUrl: string | null
  }
}

export interface CartState {
  items: CartItem[]
  isLoading: boolean
}

export interface UserWithRole {
  id: string
  email: string | null
  name: string | null
  image: string | null
  role: UserRole
}

export interface FilterState {
  brands: string[]
  families: string[]
  concentrations: string[]
  genders: string[]
  priceRange: [number, number]
  inStock: boolean
  search: string
}
