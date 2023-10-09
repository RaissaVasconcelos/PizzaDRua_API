import { InMemoryProductOrderRepository } from "../../../../tests/in-memory";
import { FindProduct } from "./findProduct-orderProduct";
import { makeProductOrder } from "../../../../tests/factory/make-productOrder";

let inMemoryProductOrderRepository: InMemoryProductOrderRepository
let sut: FindProduct

describe('findProductOrderProduct', () => {
  beforeEach(() => {
    inMemoryProductOrderRepository = new InMemoryProductOrderRepository()
    sut = new FindProduct(
      inMemoryProductOrderRepository,
    )
  })


  it('Should be products from your orderId', async () => {
    const productFake = makeProductOrder()

    await inMemoryProductOrderRepository.create(productFake)

    const result = await sut.execute(productFake.orderId)
    console.log(result.isRight())

    expect(inMemoryProductOrderRepository.productsOrders.length).toBe(1)
    expect(inMemoryProductOrderRepository.productsOrders[0]).toBe(productFake)
  })
})