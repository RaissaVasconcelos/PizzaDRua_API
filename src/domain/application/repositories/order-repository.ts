import { Order } from '../../enterprise/entities/order'
import { IOrderList } from '../../../interfaces/IOrderList'
export interface OrderRepository {
  create(order: Order): Promise<Order>
  findById(id: string): Promise<Order | null>
  findManyCustomer(customerId: string): Promise<IOrderList[]>
  findMany(): Promise<IOrderList[]>
  update(order: Order): Promise<void>
}