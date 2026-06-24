export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at'>
        Update: Partial<Omit<Order, 'id' | 'created_at'>>
      }
      order_items: {
        Row: OrderItem
        Insert: Omit<OrderItem, 'id'>
        Update: Partial<Omit<OrderItem, 'id'>>
      }
    }
  }
}

export interface Product {
  id: string
  created_at: string
  name: string
  slug: string
  line: string // e.g. "iPhone 15 Series"
  description: string
  price: number
  original_price: number | null
  images: string[] // URLs
  colors: ProductColor[]
  storages: ProductStorage[]
  specs: Record<string, string>
  in_stock: boolean
  featured: boolean
  deal: boolean
  rating: number
  review_count: number
}

export interface ProductColor {
  name: string
  hex: string
  image: string
}

export interface ProductStorage {
  label: string
  price: number
}

export interface Order {
  id: string
  created_at: string
  code: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  payment_method: string
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
  total: number
  note: string | null
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  color: string
  storage: string
  quantity: number
  price: number
}

export interface CartItem {
  product: Product
  colorIndex: number
  storageIndex: number
  quantity: number
}
