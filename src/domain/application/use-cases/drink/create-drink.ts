import { Either, left, right } from "../../../../core/either";
import { DrinkRepository } from "../../repositories/drink-repository";
import { Drink } from "../../../enterprise/entities/drink";
import { ResourceAlreadyExists } from "../../../../core/errors/resource-already-exists";

interface DrinkUseCaseRequest {
  name: string
  size: string
  price: string
  imageUrl: string
}

type DrinkUseCasesResponse = Either<ResourceAlreadyExists, {}>

export class CreateDrink {
  constructor(
    private drinkRepository: DrinkRepository
  ) {}

  async execute(drink: DrinkUseCaseRequest): Promise<DrinkUseCasesResponse> {
    const nameDrink = drink.name.toLocaleLowerCase()
    console.log('name', nameDrink)
    const drinkExist = await this.drinkRepository.findByName(nameDrink)
    console.log('exist', drinkExist?.size)
    console.log('params', drink?.size)

    if(drinkExist && drinkExist.size === drink.size) {
      return left(new ResourceAlreadyExists())
    }

    const newDrink = Drink.create(drink)

    await this.drinkRepository.create(newDrink)

    return right({})
  }
}