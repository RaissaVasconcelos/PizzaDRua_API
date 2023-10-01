import { PizzaRepository } from "../../repositories/pizza-repository";
import { Either, left, right } from "../../../../core/either";
import { Pizza } from "../../../enterprise/entities";

type PizzaUseCasesResponse = Either<null, { pizzas: Pizza[] }>

export class FindManyPizza {
  constructor(private pizzaRepository: PizzaRepository) {}

  async execute(): Promise<PizzaUseCasesResponse> {
    const pizzas = await this.pizzaRepository.findMany()

    if(!pizzas) {
      return left(null)
    }

    return right({ pizzas })
  } 
}