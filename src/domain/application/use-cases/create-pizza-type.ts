import { Either, right } from "../../../core/either"
import { PizzaType } from "../../enterprise/entities/pizza-type"
import { PizzaTypeRepository } from "../repositories/pizza-type-repository"

interface PizzaTypeRequest {
  name: string
  type: 'TRADITIONAL' | 'SPECIAL'
}

type PizzaTypeUseCaseResponse = Either<null, {}>

export class CreatePizzaTypeUseCase {
  constructor(
    private pizzaTypeRepository: PizzaTypeRepository
  ) { }

  execute = async ({ name, type }: PizzaTypeRequest): Promise<PizzaTypeUseCaseResponse> => {

    const pizzaType = PizzaType.create({
      name,
      type
    })

    await this.pizzaTypeRepository.create(pizzaType)

    return right({})
  }
}