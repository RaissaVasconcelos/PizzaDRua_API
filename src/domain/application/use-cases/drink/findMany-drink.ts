import { DrinkRepository } from "../../repositories/drink-repository";
import { Drink } from "../../../enterprise/entities/drink";
import { Either, right } from "../../../../core/either";

type DrinkResponse = Either<null, { drinks: Drink[] }>

export class FindAllDrink {
  constructor(private drinkRepository: DrinkRepository){}

  async execute(): Promise<DrinkResponse> {
    const drinks = await this.drinkRepository.findMany()

    return right({drinks})
  }
}