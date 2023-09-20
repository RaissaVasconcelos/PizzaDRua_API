import { OrderRepository } from "../../repositories/order-repository";
import { Order } from "../../../enterprise/entities";
import { Either, right, left } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

interface UpdatedOrderUseCaseRequest {
  id: string
  idCustomer: string
  idPizza: string
  idSize: string
  quantityPizza: string
  idDrink: string
  quantityDrink: string
  totalPrice: string
  status: string
}

type UpdatedOrderUseCaseResponse = Either<ResourceNotFoundError, {}>

export class UpdateOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderUpdate: UpdatedOrderUseCaseRequest): Promise<UpdatedOrderUseCaseResponse> {

    const orderId = await this.orderRepository.findById(orderUpdate.id)

    if(!orderId) {
      return left(new ResourceNotFoundError())
    }

    const order = Order.create(orderUpdate)

    await this.orderRepository.update(order)

    return right({})
  } 
}
