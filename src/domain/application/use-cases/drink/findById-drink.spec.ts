import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { InMemoryDrinkRepository } from "../../../../tests/in-memory/in-memory-drink-repository";
import { FindByIdDrink } from "./findById-drink";
import { makeDrink } from "../../../../tests/factory/make-drink";

let inMemoryDrinkRepository: InMemoryDrinkRepository
let sut: FindByIdDrink

describe('FindById Drink', () => {
  beforeEach(() => {
    inMemoryDrinkRepository = new InMemoryDrinkRepository()
    sut = new FindByIdDrink(inMemoryDrinkRepository)
  })

  it('Should be find by id a drink', async () => {
    const drinkFake = makeDrink()
    const drink = await sut.execute(drinkFake.id)

    if(drink.isRight()){
      expect(drink).toBe(drinkFake)
    }
  })

  it('Should not be find by id', async () => {
    const drink = await sut.execute('idFake')

    expect(drink.isLeft()).toBeTruthy()
    expect(drink.value).toBeInstanceOf(ResourceNotFoundError)
  })
})