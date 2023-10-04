export interface IProductList {
  id: string
  name: string
  category: {
    id: string
    name: string
  }
  categoryId: string
  description: string
  image: string | null
  price: string
  size: string
  type?: "TRADITIONAL" | "SPECIAL" | null
  createdAt: Date 
  updatedAt?: Date | null
}