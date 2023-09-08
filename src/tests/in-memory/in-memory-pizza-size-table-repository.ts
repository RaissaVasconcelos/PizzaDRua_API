import { PizzaSizeTableRepository } from "../../domain/application/repositories/pizza-size-table-repository";
import { PizzaSizeTable } from "../../domain/enterprise/entities/pizza-size-table";


export class InMemoryPizzaSizeTableRepository implements PizzaSizeTableRepository {
    public pizzaSizeTables: PizzaSizeTable[] = []

    async create(pizzaSizeTable: PizzaSizeTable): Promise<void> {
        this.pizzaSizeTables.push(pizzaSizeTable)
    }

    async findById(id: string): Promise<PizzaSizeTable | null> {
        const pizzaSizeTable = this.pizzaSizeTables.find(pizzaSize => pizzaSize.id === id)

        if (!pizzaSizeTable) {
            return null
        }

        return pizzaSizeTable
    }

    async findMany (): Promise<PizzaSizeTable[]> {
        return this.pizzaSizeTables
    }

}