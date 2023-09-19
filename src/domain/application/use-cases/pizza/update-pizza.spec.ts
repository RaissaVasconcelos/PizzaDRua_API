import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error"
import { makePizza } from "../../../../tests/factory"
import { InMemoryPizzaRepository } from "../../../../tests/in-memory/in-memory-pizza-repository"
import { UpdatePizza } from "./update-pizza"


let inMemoryPizzaRepository: InMemoryPizzaRepository
let sut: UpdatePizza

describe("Update Pizza", () => {
  beforeEach(() => {
    inMemoryPizzaRepository = new InMemoryPizzaRepository()
    sut = new UpdatePizza(inMemoryPizzaRepository)
  })

  it('should be able to update a Pizza', async () => {
    const pizzaFake = makePizza()

    const result = await sut.execute(pizzaFake)

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryPizzaRepository.pizzas[0].name).toBe(pizzaFake.name)
    }
  })

  it('should be able not to update a Pizza', async () => {
    const pizzaFake = makePizza()

    const result = await sut.execute(pizzaFake)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
})
})