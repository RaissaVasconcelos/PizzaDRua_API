import { PizzaType } from "../../enterprise/entities/pizza-type";


export interface PizzaTypeRepository {
    create(pizzaType: PizzaType): Promise<void>
    findById(id: string): Promise<PizzaType | null>
    findMany(): Promise<PizzaType[]>
}