import { makeDrink } from "../../../../tests/factory/make-drink";
import { InMemoryDrinkRepository } from "../../../../tests/in-memory/in-memory-drink-repository";
import { UpdateDrink } from "./update-drink";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

let inMemoryDrinkRepository: InMemoryDrinkRepository
let sut: UpdateDrink

describe('Update Drink', () => {
  beforeEach(() => {
    inMemoryDrinkRepository = new InMemoryDrinkRepository()
    sut = new UpdateDrink(inMemoryDrinkRepository)
  })

  it('Should be update in Drink', async () => {
    const drinkFake = makeDrink()

    await inMemoryDrinkRepository.create(drinkFake)

    const result = await sut.execute(drinkFake)

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
    }
  })

  it('Should be not updated in Drink', async () => {
    const drinkFake = makeDrink()

    await inMemoryDrinkRepository.create(drinkFake)

    const result = await sut.execute({
      name: 'Coca-cola',
      size: '600ml',
      price: '6.0',
      id: 'idFake',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})