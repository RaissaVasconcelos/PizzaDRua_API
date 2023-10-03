import { makeProduct } from "../../../../tests/factory/make-product";
import { InMemoryProductRepository } from "../../../../tests/in-memory/in-memory-product-repository";
import { UpdateProduct } from "./update-product";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

let inMemoryProductRepository: InMemoryProductRepository
let sut: UpdateProduct

describe('Update Product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new UpdateProduct(inMemoryProductRepository)
  })

  it('Should be update in Product', async () => {
    const ProductFake = makeProduct()

    await inMemoryProductRepository.create(ProductFake)

    const result = await sut.execute(ProductFake)

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
    }
  })

  it('Should be not updated in Product', async () => {
    const ProductFake = makeProduct()

    await inMemoryProductRepository.create(ProductFake)

    const result = await sut.execute({
      id: 'idFake',
      idCategory: '2',
      name: 'Coca-cola',
      description: 'gelada',
      size: '600ml',
      price: '6.0',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})