import { InMemoryDrinkRepository } from "../../../../tests/in-memory/in-memory-drink-repository";
import { FindByIdDrink } from "./findById-drink";
import { makeDrink } from "../../../../tests/factory/make-drink";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

let inMemoryDrinkRepository: InMemoryDrinkRepository
let sut: FindByIdDrink

describe('FindById Drink', () => {
  beforeEach(() => {
    inMemoryDrinkRepository = new InMemoryDrinkRepository()
    sut = new FindByIdDrink(inMemoryDrinkRepository)
  })

  it('Should be find by id a drink', async () => {
    const drinkFake = makeDrink()
    
    await inMemoryDrinkRepository.create(drinkFake)

    const result = await sut.execute(drinkFake.id)
    
    if(result.isRight()){
      expect(result.isRight()).toBeTruthy()
      expect(result.value.drink).toBe(drinkFake)
    }
  })

  it('Should not be find by id', async () => {
    const drink = await sut.execute('idFake')

    expect(drink.isLeft()).toBeTruthy()
    // toBeInstanceOf
    expect(drink.value).toBeInstanceOf(ResourceNotFoundError)
  })
})