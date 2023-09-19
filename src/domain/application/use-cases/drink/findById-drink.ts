import { Either, left, right } from "../../../../core/either";
import { DrinkRepository } from "../../repositories/drink-repository";
import { Drink } from "../../../enterprise/entities/drink";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type DrinkUseCasesResponse = Either<ResourceNotFoundError, { drink: Drink }>

export class FindByIdDrink {
  constructor(
    private drinkRepository: DrinkRepository
  ) {}

  async execute(id: string): Promise<DrinkUseCasesResponse> {
    const drink = await this.drinkRepository.findById(id)

    if (!drink) {
      return left(new ResourceNotFoundError())
    }

    return right({ drink })
  }
}