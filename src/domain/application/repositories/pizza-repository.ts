import { Pizza } from "../../enterprise/entities";


export interface PizzaRepository {
    create: (product: Pizza) => Promise<void>
    findById: (id: string) => Promise<Pizza | null>
    findMany: () => Promise<Pizza[]>
    update: (pizza: Pizza) => Promise<void>
    delete: (id: string) => Promise<void> 
}

