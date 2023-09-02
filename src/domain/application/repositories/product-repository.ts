import { Product } from "../../enterprise/entities/product";


export interface ProductRepository {
    create: (product: Product) => Promise<void>
    findById: (id: string) => Promise<Product | null>
    findMany: () => Promise<Product[]>
}

