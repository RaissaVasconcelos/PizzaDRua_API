import { OrderRepository, OrderUseCaseProps } from "../../repositories/order-repository";
import { Either, right  } from "../../../../core/either";


type OrderUseCaseResponse = Either<null, { orders: OrderUseCaseProps[] }>

export class FindManyOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(param: any, customerId: string): Promise<OrderUseCaseResponse> {
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