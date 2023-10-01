import { makePizza } from "../../../../tests/factory"
import { InMemoryPizzaRepository } from "../../../../tests/in-memory/in-memory-pizza-repository"
import { FindManyPizza } from "./findMany-pizza"


let inMemoryPizzaRepository: InMemoryPizzaRepository
let sut: FindManyPizza

describe("CreatePizzaUseCase", () => {
  beforeEach(() => {
    inMemoryPizzaRepository = new InMemoryPizzaRepository()
    sut = new FindManyPizza(inMemoryPizzaRepository)
  })

  it('should be able to findMany a Pizza', async () => {
    const pizzaFake = makePizza()

    await inMemoryPizzaRepository.create(pizzaFake)

    const result = await sut.execute()

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryPizzaRepository.pizzas.length).toBe(1)
    }
  })
})