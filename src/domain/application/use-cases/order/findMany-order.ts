import { OrderRepository } from "../../repositories/order-repository";
import { Either, right  } from "../../../../core/either";
import { IOrderList } from "../../../../interfaces/IOrderList";

interface OrderUseCaseRequest {
  // customerRole: { role: string }
  customerId?: string
}


type OrderUseCaseResponse = Either<null, { orders: IOrderList[] }>


export class FindManyOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute({ customerId }: OrderUseCaseRequest): Promise<OrderUseCaseResponse> {

    if (customerId) {
      const orders = await this.orderRepository.findManyCustomer(customerId)

      return right({ orders }) 
    }

      const orders = await this.orderRepository.findMany()
    
    return right({ orders })

  }
}