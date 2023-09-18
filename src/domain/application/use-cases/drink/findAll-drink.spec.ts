import { InMemoryDrinkRepository } from "../../../../tests/in-memory/in-memory-drink-repository";
import { FindAllDrink } from "./findAll-drink";
import { makeDrink } from "../../../../tests/factory/make-drink";

let inMemoryDrinkRepository: InMemoryDrinkRepository
let sut: FindAllDrink

describe('FindAll drinks', () => {
  beforeEach(() => {
    inMemoryDrinkRepository = new InMemoryDrinkRepository()
    sut = new FindAllDrink(inMemoryDrinkRepository)
  })

  it('Should be to bring in list Drisks', async () => {
    const drinkFake = makeDrink()
    const arr = ['1', '2']
    
    arr.forEach( async () => (
      await inMemoryDrinkRepository.create(drinkFake)
    ));

    const result = await sut.execute()

    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(result.value.drinks.length).toBe(2)
    }
  })
})