import { Product } from "../../enterprise/entities";


export interface ProductRepository {
    create: (product: Product) => Promise<void>
    findById: (id: string) => Promise<Product | null>
    findByName: (name: string) => Promise<Product | null>
    findMany: () => Promise<Product[]>
    update: (product: Product) => Promise<void>
    delete: (id: string) => Promise<void> 
}

