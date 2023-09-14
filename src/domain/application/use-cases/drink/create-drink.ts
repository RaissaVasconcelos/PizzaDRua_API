import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";
import { Either, right } from "../../../../core/either";
import { DrinkRepository } from "../../repositories/drink-repository";
import { Drink } from "../../../enterprise/entities/drink";

interface DrinkUseCaseRequest {
  id: string
  name: string
  size: string
  price: string
}

type DrinkUseCasesResponse = Either<CustomerAlreadyExistsError, {}>

export class CreateDrink {
  constructor(
    private drinkRepository: DrinkRepository
  ) {}

  async execute(drink: DrinkUseCaseRequest): Promise<DrinkUseCasesResponse> {
    const newDrink = Drink.create(drink)

    await this.drinkRepository.create(newDrink)

    return right({})
  }
}