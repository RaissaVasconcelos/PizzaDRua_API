import { Either, left, right } from "../../../../core/either";
import { CustomerRepository } from "../../repositories/customer-repository";
import { OrderRepository } from "../../repositories/order-repository";
import { Order } from "../../../enterprise/entities/order"
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";
import { ProductRepository } from "../../repositories/product-repository";
import { CreatedOrderError } from "../../../../core/errors/created-order-error";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

interface dataProduct {
  mode: "MIXED" | "SIMPLE" 
  product: string[]
  size: string
  quantity: string
}
interface CreateOrderUseCaseRequest {
  customerId: string
  payment: string
  totalPrice: string
  status: string
  itensOrder: dataProduct[]
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

    async execute({ customerId, itensOrder, payment, status, totalPrice }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
      const customer = await this.customeRepository.findById(customerId)

      if (!customer) {
        return left(new CustomerAlreadyExistsError())
      }

      // array com os produtos
      await Promise.all(itensOrder.map(async (product) => {
        console.log(product)
        // se a pizza obtiver mais sabores
        if(product.mode === 'MIXED') {
          const prices = await Promise.all(product.product.map(async (productName) => {
            const product = await this.productRepository.findByName(productName)
            return Number(product?.price)
          }))

          const maxValue = Math.max(...prices)
          
          this.acumulador += ((product.size === 'meia' ? ( maxValue / 2 ) : maxValue) * Number(product.quantity));
          return
        }

        const response = await this.productRepository.findByName(product.product[0])
        const priceProduct = Number(response?.price) 
        this.acumulador += ((product.size === 'meia' ? ( priceProduct / 2 ) : priceProduct) * Number(product.quantity));
      }));

      console.log('Valor total da compra', this.acumulador.toFixed(2))

      const value = Number(this.acumulador.toFixed(2))
      const valueMin = Number(totalPrice) - 0.5
      const valueMax = Number(totalPrice) + 0.5

      // min <= totalPrice < max
      if(value >= valueMin && value < valueMax) {
        const newOrder = Order.create({
          customerId,
          itensOrder,
          payment,
          status,
          totalPrice: value.toString(),
        })
  
        this.orderRepository.create(newOrder)
        return right({})
      }
      
      return left(new CreatedOrderError())
    }
}

