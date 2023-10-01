import { makeDrink } from "../../../../tests/factory/make-drink";
import { InMemoryDrinkRepository } from "../../../../tests/in-memory/in-memory-drink-repository";
import { DeleteDrink } from "./delete-drink";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

let inMemoryDrinkRepository: InMemoryDrinkRepository
let sut: DeleteDrink

describe('Delete Drink', () => {
  beforeEach(() => {
    inMemoryDrinkRepository = new InMemoryDrinkRepository()
    sut = new DeleteDrink(inMemoryDrinkRepository)
  })

  it('Should be delete in Drink', async () => {
    const drinkFake = makeDrink()

    await inMemoryDrinkRepository.create(drinkFake)

    const result = await sut.execute(drinkFake.id)

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryDrinkRepository.drinks.length).toBe(0)
    }
  })

  it('Should be not delete in Drink', async () => {
    const drinkFake = makeDrink()

    await inMemoryDrinkRepository.create(drinkFake)

    const result = await sut.execute('idFake')

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})