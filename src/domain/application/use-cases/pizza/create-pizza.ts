import { Either, right, left } from "../../../../core/either";
import { ResourceAlreadyExists } from "../../../../core/errors/resource-already-exists";
import { Pizza } from "../../../enterprise/entities";
import { PizzaRepository } from "../../repositories/product-repository";


interface PizzaUseCaseRequest {
    imageUrl: string
    name: string
    type: "TRADITIONAL" | "SPECIAL"
    description: string
    price: string
}

type PizzaUseCaseResponse = Either<ResourceAlreadyExists, {}>

export class CreatePizza {
    constructor(
        private readonly pizzaRepository: PizzaRepository
    ) {}

    async execute({ imageUrl ,description, name, type, price}: PizzaUseCaseRequest): Promise<PizzaUseCaseResponse> {
        const namePizza = name.toLocaleLowerCase()
        const pizzaExists = await this.pizzaRepository.findByName(namePizza)

        if(pizzaExists) {
            return left(new ResourceAlreadyExists())
        }

        const pizza = Pizza.create({
            imageUrl,
            name,
            description,
            type,
            price,
        })
        
        await this.pizzaRepository.create(pizza)

        return right({})
    }
}    