import { OrderRepository } from "../../repositories/order-repository";
import { Either, right  } from "../../../../core/either";
import { IOrderList } from "../../../../interfaces/IOrderList";

interface OrderUseCaseRequest {
  customerRole: { role: string }
  customerId: string
}


type OrderUseCaseResponse = Either<null, { orders: IOrderList[] }>


export class FindManyOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute({ customerRole, customerId }: OrderUseCaseRequest): Promise<OrderUseCaseResponse> {
    console.log('role', customerRole)

    if (!customerRole.role) {
      const orders = await this.orderRepository.findMany()

      return right({ orders }) 
    }

    const orders = await this.orderRepository.findManyCustomer(customerId)
    
    return right({ orders })

  }
}