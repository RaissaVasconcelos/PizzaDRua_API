import { PizzaSizeTable } from "../../enterprise/entities/pizza-size-table"


export interface PizzaSizeTableRepository {
    create: (pizzaSizeTable: PizzaSizeTable) => Promise<void>
    findById: (id: string) => Promise<PizzaSizeTable | null>
    findMany: () => Promise<PizzaSizeTable[]>
}

