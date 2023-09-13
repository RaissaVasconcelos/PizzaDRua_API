import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { CustomerRepository } from "../../repositories/customer-repository";
import { OrderRepository } from "../../repositories/order-repository";
import { Order } from "../../../enterprise/entities/order"


interface CreateOrderUseCaseRequest {
  idCustomer: string
  idPizza: string
  idSize: string
  quantityPizza: string
  idDrink: string
  quantityDrink: string
  totalPrice: string
  status: string
}

type CreateOrderUseCaseResponse = Either<ResourceNotFoundError, {}>

export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private customeRepository: CustomerRepository 
    ) {}

    async execute(order: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
      const customer = await this.customeRepository.findById(order.idCustomer)

      if (!customer) {
        return left(new ResourceNotFoundError)
      }

      const newOrder = Order.create(order)

      await this.orderRepository.create(newOrder)

      return right({})
    }
}

