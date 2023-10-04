import { Either, left, right } from "../../../../core/either";
import { ProductRepository } from "../../repositories/product-repository";
import { Product } from "../../../enterprise/entities/product";
import { CategoryRepository } from "../../repositories/category-repository";
import { CategoryNotFoundError } from "../../../../core/errors/category-not-found-error";

interface ProductUseCaseRequest {
  name: string
  category: string
  type?: "TRADITIONAL" | "SPECIAL" | null
  image?: string | null 
  size: string
  description: string
  price: string
}

type ProductUseCasesResponse = Either<CategoryNotFoundError, {}>

export class Createproduct {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({ name, description, category, price, size, image, type }: ProductUseCaseRequest): Promise<ProductUseCasesResponse> {
    const categoryProduct = await this.categoryRepository.findByName(category)
    console.log(categoryProduct)

    if(categoryProduct) {
      const newProduct = Product.create({
        name,
        description,
        categoryId: categoryProduct.id,
        price,
        size,
        image,
        type,
      })
      
      await this.productRepository.create(newProduct)

      return right({})
    }
    
    return left(new CategoryNotFoundError())
  }
}