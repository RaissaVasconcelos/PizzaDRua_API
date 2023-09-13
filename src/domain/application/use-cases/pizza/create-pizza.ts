import { Either, right } from "../../../../core/either";
import { Pizza } from "../../../enterprise/entities";
import { PizzaRepository } from "../../repositories/pizza-repository";


interface PizzaUseCaseRequest {
    imageUrl: string;
    name: string;
    type: "TRADITIONAL" | "SPECIAL"
    description: string;
}

type PizzaUseCaseResponse = Either<null, {}>

export class CreatePizzaUseCase {
    constructor(
        private readonly pizzaRepository: PizzaRepository
    ) {}

    async execute({ imageUrl ,description, name, type}: PizzaUseCaseRequest): Promise<PizzaUseCaseResponse> {
        const pizza = Pizza.create({
            imageUrl,
            name,
            description,
            type,
        })
        await this.pizzaRepository.create(pizza)

        return right({})
    }
}    