import { OrderRepository, OrderUseCaseProps } from "../../repositories/order-repository";
import { Either, right  } from "../../../../core/either";


type OrderUseCaseResponse = Either<null, { orders: OrderUseCaseProps[] }>

export class FindManyOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<OrderUseCaseResponse> {
    const orders = await this.orderRepository.findMany()
  
    return right({ orders }) 
  }
}