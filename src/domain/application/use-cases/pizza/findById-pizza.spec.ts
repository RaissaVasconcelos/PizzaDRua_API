import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error"
import { makePizza } from "../../../../tests/factory"
import { InMemoryPizzaRepository } from "../../../../tests/in-memory/in-memory-pizza-repository"
import { FindByIdPizza } from "./findById-pizza"


let inMemoryPizzaRepository: InMemoryPizzaRepository
let sut: FindByIdPizza

describe("CreatePizzaUseCase", () => {
  beforeEach(() => {
    inMemoryPizzaRepository = new InMemoryPizzaRepository()
    sut = new FindByIdPizza(inMemoryPizzaRepository)
  })

  it('should be able to findById a Pizza', async () => {
    const pizzaFake = makePizza()

    await inMemoryPizzaRepository.create(pizzaFake)

    const result = await sut.execute(pizzaFake.id)

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryPizzaRepository.pizzas.length).toBe(1)
    }
  })

  it('should be able not to findById a Pizza', async () => {
    const pizzaFake = makePizza()

    await inMemoryPizzaRepository.create(pizzaFake)

    const result = await sut.execute('idFakePizza')

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})