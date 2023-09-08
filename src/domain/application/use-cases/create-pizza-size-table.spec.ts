import { InMemoryPizzaSizeTableRepository } from "../../../tests/in-memory/in-memory-pizza-size-table-repository";
import { CreatePizzaSizeTableUseCase } from "./create-pizza-size-table";


let inMemoryPizzaSizeTableRepository: InMemoryPizzaSizeTableRepository
let sut: CreatePizzaSizeTableUseCase

describe("CreatePizzaSizeTableUseCase", () => {
  beforeEach(() => {
    inMemoryPizzaSizeTableRepository = new InMemoryPizzaSizeTableRepository()
    sut = new CreatePizzaSizeTableUseCase(inMemoryPizzaSizeTableRepository)
  })

  it('should be able to create a pizza size table', async () => {
    const result = await sut.execute({
      price: "price",
      size: "size"
    })

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryPizzaSizeTableRepository.pizzaSizeTables.length).toBe(1)
    }
  })
})