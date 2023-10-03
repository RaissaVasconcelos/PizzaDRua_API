import { ProductRepository } from "../../repositories/product-repository";
import { Product } from "../../../enterprise/entities/product";
import { Either, right } from "../../../../core/either";

type ProductResponse = Either<null, { products: Product[] }>

export class FindManyProduct {
  constructor(private productRepository: ProductRepository){}

  async execute(): Promise<ProductResponse> {
    const products = await this.productRepository.findMany()

    return right({products})
  }
}