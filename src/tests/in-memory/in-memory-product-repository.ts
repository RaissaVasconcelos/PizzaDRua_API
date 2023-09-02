import { ProductRepository } from "../../domain/application/repositories/product-repository";
import { Product } from "../../domain/enterprise/entities/product";


export class InMemoryProductRepository implements ProductRepository {
    public products: Product[] = []

    async create(product: Product): Promise<void> {
        this.products.push(product)
    }

    async findById(id: string): Promise<Product | null> {
        const product =  this.products.find(product => product.id === id)

        if (!product) {
            return null
        }

        return product
    }

    async findMany(): Promise<Product[]> {
        return this.products
    }

}