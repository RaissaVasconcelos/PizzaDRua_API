import { DrinkRepository } from "../../repositories/drink-repository";
import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type DrinkUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteDrink {
  constructor(private drinkRepository: DrinkRepository){}

  async execute(id: string): Promise<DrinkUseCaseResponse> {
    const drinkId = await this.drinkRepository.findById(id)

    if (!drinkId) {
      return left(new ResourceNotFoundError())
    }

    await this.drinkRepository.delete(id)

    return right({})
  }
}