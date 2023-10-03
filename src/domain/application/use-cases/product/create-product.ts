import { Either, right } from "../../../../core/either";
import { ProductRepository } from "../../repositories/product-repository";
import { Product } from "../../../enterprise/entities/product";

interface ProductUseCaseRequest {
  name: string
  idCategory: string
  type?: "TRADITIONAL" | "SPECIAL" | null
  imageUrl?: string | null 
  size: string
  description: string
  price: string
  createdAt: Date
  updatedAt?: Date | null
}

type ProductUseCasesResponse = Either<null, {}>

export class Createproduct {
  constructor(
    private productRepository: ProductRepository,
  ) {}

  async execute(product: ProductUseCaseRequest): Promise<ProductUseCasesResponse> {
    const newProduct = Product.create(product)

    await this.productRepository.create(newProduct)

    return right({})
  }
}