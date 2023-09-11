import { InMemoryPizzaTypeRepository } from "../../../tests/in-memory/in-memory-pizza-type-repository"
import { CreatePizzaTypeUseCase } from "./create-pizza-type"


let inMemoryPizzaTypeRepository: InMemoryPizzaTypeRepository
let sut: CreatePizzaTypeUseCase

describe("CreatePizzaTypeUseCase", () => {
  beforeEach(() => {
    inMemoryPizzaTypeRepository = new InMemoryPizzaTypeRepository()
    sut = new CreatePizzaTypeUseCase(inMemoryPizzaTypeRepository)
  })

  it('should be able to create a pizza type', async () => {
    const result = await sut.execute({
      name: "Frango",
      type: "TRADITIONAL"
    })

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryPizzaTypeRepository.types.length).toBe(1)
    }

  })
})