export type GarmentType = 'tshirt' | 'hoodie' | 'crop-top' | 'long-sleeve' | 'sweatshirt'

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  tag?: string
  colors: string[]
  category: string
  description: string
  sizes: string[]
  material: string
  fit: string
  garmentType: GarmentType
  customizable: boolean
}
