import { InMemoryPizzaRepository } from "../../../../tests/in-memory/in-memory-pizza-repository"
import { CreatePizza } from "./create-pizza"


let inMemoryPizzaRepository: InMemoryPizzaRepository
let sut: CreatePizza

describe("CreatePizzaUseCase", () => {
  beforeEach(() => {
    inMemoryPizzaRepository = new InMemoryPizzaRepository()
    sut = new CreatePizza(inMemoryPizzaRepository)
  })

  it('should be able to create a Pizza', async () => {
    const result = await sut.execute({
      imageUrl: "imageUrl",
      name: "Pizza",
      type: 'TRADITIONAL',
      description: "Any description"
    })

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryPizzaRepository.pizzas.length).toBe(1)
    }
  })

    
})