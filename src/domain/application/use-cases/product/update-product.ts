import { Either, left, right } from "../../../../core/either";
import { ProductRepository } from "../../repositories/product-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Product } from "../../../enterprise/entities/product";

interface productUseCaseRequest {
  id: string,
  name: string
  idCategory: string
  type?: "TRADITIONAL" | "SPECIAL" | null
  imageUrl?: string | null 
  size: string
  description: string
  price: string
}

type ProductUseCasesResponse = Either<ResourceNotFoundError, {}>

export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(product: productUseCaseRequest): Promise<ProductUseCasesResponse> {
    const id = await this.productRepository.findById(product.id)

    if (!id) {
      return left(new ResourceNotFoundError())
    }

    const updateProduct = Product.create(product)

    await this.productRepository.update(updateProduct)

    return right({})
  }
}