import { PizzaRepository } from "../../repositories/pizza-repository";
import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Pizza, typePizza } from "../../../enterprise/entities";

interface PizzaUseCaseRequest {
  id: string
  imageUrl: string
  name: string
  type: typePizza
  price: string
  description: string
}

type PizzaUseCasesResponse = Either<ResourceNotFoundError, {}>

export class UpdatePizza {
  constructor(private pizzaRepository: PizzaRepository) {}

  async execute(pizzaUpdate: PizzaUseCaseRequest): Promise<PizzaUseCasesResponse> {
    const pizza = await this.pizzaRepository.findById(pizzaUpdate.id)

    if(!pizza) {
      return left(new ResourceNotFoundError())
    }

    const newPizza = Pizza.create(pizzaUpdate)

    await this.pizzaRepository.update(newPizza)

    return right({})
  } 
}