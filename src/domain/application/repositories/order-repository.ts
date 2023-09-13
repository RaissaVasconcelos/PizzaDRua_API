import { Order } from '../../enterprise/entities/order'

export interface OrderRepository {
  create(order: Order): Promise<void>
  findById(id: string): Promise<Order | null>
  findMany(): Promise<Order[] | []>
  update(id: string, order: Order): Promise<void>
}