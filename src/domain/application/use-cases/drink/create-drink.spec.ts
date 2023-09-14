import { InMemoryDrinkRepository } from "../../../../tests/in-memory/in-memory-drink-repository";
import { makeDrink } from "../../../../tests/factory/make-drink";
import { CreateDrink } from "./create-drink";

let inMemoryDrinkRepository: InMemoryDrinkRepository
let sut: CreateDrink

describe('CreateUseCaseDrink', () => {
  beforeEach(() => {
    inMemoryDrinkRepository = new InMemoryDrinkRepository()
    sut = new CreateDrink(inMemoryDrinkRepository)
  })

  it('Should be able create a drink', async () => {
    const drinkFake = makeDrink()

    const drink = await sut.execute(drinkFake)

    
    if(drink.isRight()) {
      expect(drink.isRight).toBeTruthy()
      expect(inMemoryDrinkRepository.drinks.length).toBe(1)
    }
  })

  it('Should be not able create a drink', async () => {
    const drinkFake = makeDrink()

    const drink = await sut.execute(drinkFake)

    
    if(drink.isRight()) {
      expect(drink.isRight).toBeTruthy()
      expect(inMemoryDrinkRepository.drinks.length).toBe(1)
    }
  })
})