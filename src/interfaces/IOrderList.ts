export interface IOrderList {
  methodDelivery: "DELIVERY" | "PICKUP"
  status: string
  payment: "CARD" | "MONEY" | "PIX",
  id: string
  createdAt: Date
  totalPrice: string
  customer: {
    name: string
    email: string
    phone: string
    address: {
      id: string
      street: string
      number: string
      type: string
      neighborhood: { name: string, tax: string }
      zipCode: string
      phone: string
    }[],
  }
  itensOrder: {
    mode: "MIXED" | "SIMPLE",
    price: string
    product: string[]
    quantity: number
    size: "ENTIRE" | "HALF"
  }[]
}