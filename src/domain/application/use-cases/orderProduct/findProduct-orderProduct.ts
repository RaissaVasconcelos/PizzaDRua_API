import { ProductOrderRepository } from "../../repositories/productOrder-repository";
import { ProductOrder } from "../../../enterprise/entities";
import { Either, left, right } from "../../../../core/either";

type findProductOrderProductResponse = Either<null, { products: ProductOrder[] | null }>

export class FindProduct {
  constructor(
    private productOrderRepository: ProductOrderRepository,
  ) {}

  async execute(order: string): Promise<findProductOrderProductResponse> {

    const products = await this.productOrderRepository.findProduct(order)

    if(products?.length) {
      return left(null)
    }

    return right({ products })
  }
}