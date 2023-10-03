import { PizzaRepository } from "../../domain/application/repositories/product-repository";
import { Pizza } from "../../domain/enterprise/entities";


export class InMemoryPizzaRepository implements PizzaRepository {
    public pizzas: Pizza[] = []

    async create(product: Pizza): Promise<void> {
        this.pizzas.push(product)
    }

    async findById(id: string): Promise<Pizza | null> {
        const product =  this.pizzas.find(pizza => pizza.id === id)

        if (!product) {
            return null
        }

        return product
    }

    async findMany(): Promise<Pizza[]> {
        return this.pizzas
    }

    async update(pizzaUpdate: Pizza): Promise<void> {
        const index = this.pizzas.findIndex(pizza => pizza.id === pizzaUpdate.id)
        
        if(index >= 0) {
            this.pizzas[index] = pizzaUpdate
        }
    }

    async delete(id: string): Promise<void> {
        this.pizzas = this.pizzas.filter(pizza => pizza.id !== id)
    }

}