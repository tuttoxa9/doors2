export interface Product {
  id: string
  name: string
  category: string
  price: {
    min: number
    max: number
  }
  description: string
  colors: string[]
  images: string[]
  inStock: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductFormData {
  name: string
  category: string
  priceMin: number
  priceMax: number
  description: string
  colors: string[]
  inStock: boolean
  featured: boolean
}

export type ProductCategory =
  | 'Шкафы'
  | 'Комоды'
  | 'Столы'
  | 'Полки'
  | 'Гардеробные'
  | 'Детские шкафы'
