import { OrderRepository } from "../../repositories/order-repository";
import { ProductOrderRepository } from "../../repositories/productOrder-repository";
import { ProductRepository } from "../../repositories/product-repository";
import { ProductOrder } from "../../../enterprise/entities";
import { Either, left, right } from "../../../../core/either";

interface CreateOrderProductRequest {
  orderId: string
  productId: string
  quantity: string
}

type CreateOrderProductResponse = Either<null, {}>

export class CreateOrderProduct {
  constructor(
    private productOrderRepository: ProductOrderRepository,
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute({ orderId, productId, quantity}: CreateOrderProductRequest): Promise<CreateOrderProductResponse> {
    const orderExists = await this.orderRepository.findById(orderId)
    const productExists = await this.productRepository.findById(productId)

    if(!orderExists || !productExists) {
      left(null)
    }

    const newProductOrder = ProductOrder.create({ orderId, productId, quantity })

    await this.productOrderRepository.create(newProductOrder)
    
    return right({})
  }
}