import { InMemoryProductOrderRepository } from "../../../../tests/in-memory";
import { FindManyOrderProduct } from "./findMany-orderProduct";
import { makeProductOrder } from "../../../../tests/factory/make-productOrder";

let inMemoryProductOrderRepository: InMemoryProductOrderRepository
let sut: FindManyOrderProduct

describe('FindManyProductOrder', () => {
  beforeEach(() => {
    inMemoryProductOrderRepository = new InMemoryProductOrderRepository()
    sut = new FindManyOrderProduct(
      inMemoryProductOrderRepository,
    )
  })


  it('Should be get in productOrders', async () => {
    const productFake = makeProductOrder()

    await inMemoryProductOrderRepository.create(productFake)

    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryProductOrderRepository.productsOrders.length).toBe(1)
  })
})