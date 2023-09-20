import { PizzaRepository } from "../../repositories/pizza-repository";
import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type PizzaUseCasesResponse = Either<ResourceNotFoundError, {}>

export class DeletePizza {
  constructor(private pizzaRepository: PizzaRepository) {}

  async execute(id: string): Promise<PizzaUseCasesResponse> {
    const pizza = await this.pizzaRepository.findById(id)

    if(!pizza) {
      return left(new ResourceNotFoundError())
    }

    this.pizzaRepository.delete(id)

    return right({})
  } 
}