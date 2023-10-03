import { PizzaRepository } from "../../repositories/product-repository";
import { Either, left, right } from "../../../../core/either";
import { Pizza } from "../../../enterprise/entities";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type PizzaUseCasesResponse = Either<ResourceNotFoundError, { pizza: Pizza }>

export class FindByIdPizza {
  constructor(private pizzaRepository: PizzaRepository) {}

  async execute(id: string): Promise<PizzaUseCasesResponse> {
    const pizza = await this.pizzaRepository.findById(id)

    if(!pizza) {
      return left(new ResourceNotFoundError())
    }

    return right({ pizza })
  } 
}