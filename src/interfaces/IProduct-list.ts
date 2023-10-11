export interface IProductList {
  id: string
  name: string
  category: {
    id: string
    name: string
  }
  description: string
  price: string
  size: string
  type?: "TRADITIONAL" | "SPECIAL" | null
  status: "ACTIVE" | "DISABLE"
  createdAt: Date 
  updatedAt?: Date | null
}