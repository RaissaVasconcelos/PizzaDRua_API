import { InMemoryProductRepository } from "../../../tests/in-memory/in-memory-product-repository"
import { CreateProductUseCase } from "./create-product"


let inMemoryProductRepository: InMemoryProductRepository
let sut: CreateProductUseCase

describe("CreateProductUseCase", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new CreateProductUseCase(inMemoryProductRepository)
  })

  it('should be able to create a product', async () => {
    const result = await sut.execute({
      imageUrl: "imageUrl",
      name: "Pizza",
      description: "Any description"
    })

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryProductRepository.products.length).toBe(1)
    }

  })
})