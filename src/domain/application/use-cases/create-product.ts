import { Either, right } from "../../../core/either";
import { Product } from "../../enterprise/entities/product";
import { ProductRepository } from "../repositories/product-repository";


interface ProductUseCaseRequest {
    imageUrl: string;
    name: string;
    description: string;
}

type ProductUseCaseResponse = Either<null, {}>

export class CreateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository
    ) {}

    async execute({ imageUrl ,description, name}: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
        const product = Product.create({
            imageUrl,
            name,
            description
        })
        await this.productRepository.create(product)

        return right({})
    }
}    