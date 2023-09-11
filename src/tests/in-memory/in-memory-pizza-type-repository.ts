import { PizzaTypeRepository } from "../../domain/application/repositories/pizza-type-repository";
import { PizzaType } from "../../domain/enterprise/entities/pizza-type";


export class InMemoryPizzaTypeRepository implements PizzaTypeRepository {
    public types: PizzaType[] = []

    async create(pizzaType: PizzaType): Promise<void> {
        this.types.push(pizzaType)
    }

    async findById(id: string): Promise<PizzaType | null> {
        const pizzaType = this.types.find(type => type.id === id)

        if (!pizzaType) {
            return null
        }

        return pizzaType
    }

    async findMany(): Promise<PizzaType[]> {
        return this.types
    }

}