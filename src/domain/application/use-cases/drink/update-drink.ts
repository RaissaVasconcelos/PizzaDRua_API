import { Either, left, right } from "../../../../core/either";
import { DrinkRepository } from "../../repositories/drink-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Drink } from "../../../enterprise/entities/drink";

interface DrinkUseCaseRequest {
  id: string,
  name: string,
  imageUrl: string
  size: string,
  price: string,
}

type DrinkUseCasesResponse = Either<ResourceNotFoundError, {}>

export class UpdateDrink {
  constructor(private drinkRepository: DrinkRepository) {}

  async execute(drink: DrinkUseCaseRequest): Promise<DrinkUseCasesResponse> {
    const id = await this.drinkRepository.findById(drink.id)

    if (!id) {
      return left(new ResourceNotFoundError())
    }

    const newDrink = Drink.create(drink)

    await this.drinkRepository.update(newDrink)

    return right({})
  }
}