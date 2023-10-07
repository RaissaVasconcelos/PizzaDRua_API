import { Either, left, right } from "../../../../core/either";
import { CustomerRepository } from "../../repositories/customer-repository";
import { OrderRepository } from "../../repositories/order-repository";
import { Order } from "../../../enterprise/entities/order"
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";
import { ProductRepository } from "../../repositories/product-repository";
import { CreatedOrderError } from "../../../../core/errors/created-order-error";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

interface dataProduct {
  category: string
  product: string[]
  size: string
  quantity: string
}
interface CreateOrderUseCaseRequest {
  customerId: string
  payment: string
  totalPrice: string
  status: string
  extendedOrdersData: dataProduct[]
}

type CreateOrderUseCaseResponse = Either<
  CustomerAlreadyExistsError | CreatedOrderError | ResourceNotFoundError, {}>

export class CreateOrder {
  private acumulador: number

  constructor(
    private orderRepository: OrderRepository,
    private customeRepository: CustomerRepository,
    private productRepository: ProductRepository,
    ) {
      this.acumulador = 0
    }

    async execute({ customerId, extendedOrdersData, payment, status, totalPrice }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
      const customer = await this.customeRepository.findById(customerId)

      if (!customer) {
        return left(new CustomerAlreadyExistsError())
      }

      // array com os produtos
      await Promise.all(extendedOrdersData.map(async (product) => {
        if(product.category === 'pizzas') {
          const prices = await Promise.all(product.product.map(async (productName) => {
            const product = await this.productRepository.findByName(productName)
            return Number(product?.price)
          }))

          const maxValue = Math.max(...prices)

          if(product.size === 'meia') {
            this.acumulador += maxValue / 2
            return 
          }
          
          // pizza inteira
          this.acumulador += (maxValue * Number(product.quantity))
          return
        }

        const priceProduct = await this.productRepository.findByName(product.product[0])
        this.acumulador += (Number(priceProduct?.price) * Number(product.quantity)) 
        
      }));

      console.log('Valor total da compra', this.acumulador.toFixed(2))

      const value = Number(this.acumulador.toFixed(2))
      console.log(totalPrice)
      console.log('value total', value)
      const valueMin = Number(totalPrice) - 0.5
      const valueMax = Number(totalPrice) + 0.5

      // min <= totalPrice < max
      if(value >= valueMin && value < valueMax) {
        console.log('created order')
        const newOrder = Order.create({
          customerId,
          extendedOrdersData,
          payment,
          status,
          totalPrice: value.toString(),
        })
  
        console.log('newOrder', newOrder)
  
        this.orderRepository.create(newOrder)
        return right({})
      }
      


      return left(new CreatedOrderError())
    }
}

