import { OrderRepository } from "../../repositories/order-repository";
import { Order } from "../../../enterprise/entities";
import { Either, right  } from "../../../../core/either";

type OrderUsecasesRequest = Either<null, { orders: Order[] }>

export class FindManyOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(param: any, customerId: string): Promise<OrderUsecasesRequest> {
    const { role } = param
    console.log('role', role)

    if (!role) {
      const orders = await this.orderRepository.findMany()

      return right({ orders }) 
    }

    const orders = await this.orderRepository.findManyCustomer(customerId)

    return right({ orders }) 
  }
}