import { Order } from '../../enterprise/entities/order'

export interface OrderRepository {
  create(order: Order): Promise<void>
  findById(id: string): Promise<Order | null>
  findMany(): Promise<Order[] | []>
  findManyCustomer(customerId: string): Promise<any[]>
  update(order: Order): Promise<void>
}