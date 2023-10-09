import { ProductOrderRepository } from "../../repositories/productOrder-repository";
import { ProductOrder } from "../../../enterprise/entities";
import { Either, right } from "../../../../core/either";

type findManyOrderProductResponse = Either<null, { products: ProductOrder[] }>

export class FindManyOrderProduct {
  constructor(
    private productOrderRepository: ProductOrderRepository,
  ) {}

  async execute(): Promise<findManyOrderProductResponse> {
    const products = await this.productOrderRepository.findMany()
    return right({ products })
  }
}