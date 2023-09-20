import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error"
import { makePizza } from "../../../../tests/factory"
import { InMemoryPizzaRepository } from "../../../../tests/in-memory/in-memory-pizza-repository"
import { DeletePizza } from "./delete-pizza"


let inMemoryPizzaRepository: InMemoryPizzaRepository
let sut: DeletePizza

describe("Delete Pizza", () => {
  beforeEach(() => {
    inMemoryPizzaRepository = new InMemoryPizzaRepository()
    sut = new DeletePizza(inMemoryPizzaRepository)
  })

  it('should be able to delete a Pizza', async () => {
    const pizzaFake = makePizza()

    await inMemoryPizzaRepository.create(pizzaFake)

    const result = await sut.execute(pizzaFake.id)

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryPizzaRepository.pizzas.length).toBe(0)
    }
  })

  it('should be able not to delete a Pizza', async () => {
    const pizzaFake = makePizza()

    await inMemoryPizzaRepository.create(pizzaFake)

    const result = await sut.execute('idFakePizza')

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
    
})