import { InMemoryProductRepository } from "../../../../tests/in-memory/in-memory-product-repository";
import { makeProduct } from "../../../../tests/factory/make-product";
import { Createproduct } from "./create-product";

let inMemoryproductRepository: InMemoryProductRepository
let sut: Createproduct

describe('CreateUseCaseproduct', () => {
  beforeEach(() => {
    inMemoryproductRepository = new InMemoryProductRepository()
    sut = new Createproduct(inMemoryproductRepository)
  })

  it('Should be able create a product', async () => {
    const productFake = makeProduct()

    const product = await sut.execute(productFake)

    if(product.isRight()) {
      expect(product.isRight).toBeTruthy()
      expect(inMemoryproductRepository.products.length).toBe(1)
    }
  })
})