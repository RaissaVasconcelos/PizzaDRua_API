import { OrderRepository } from "../../repositories/order-repository";
import { Order } from "../../../enterprise/entities";
import { Either, right  } from "../../../../core/either";

type OrderUsecasesRequest = Either<null, { order: Order[] }>

export class FindManyOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<OrderUsecasesRequest> {
    const order = await this.orderRepository.findMany()

    return right({ order }) 
  }
}