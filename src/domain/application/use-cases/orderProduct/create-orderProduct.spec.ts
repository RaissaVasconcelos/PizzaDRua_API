import {
  InMemoryProductOrderRepository,
  InMemoryProductRepository,
  InMemoryOrderRepository } from "../../../../tests/in-memory";
import { CreateOrderProduct } from "./create-orderProduct";
import { makeProductOrder } from "../../../../tests/factory/make-productOrder";

let inMemoryProductOrderRepository: InMemoryProductOrderRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryProductRepository: InMemoryProductRepository
let sut: CreateOrderProduct

describe('CreateOrderProduct', () => {
  beforeEach(() => {
    inMemoryProductOrderRepository = new InMemoryProductOrderRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository()
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new CreateOrderProduct(
      inMemoryProductOrderRepository,
      inMemoryOrderRepository,
      inMemoryProductRepository,
    )
  })


  it('Should be create in productOrder', async () => {
    const productFake = makeProductOrder()

    const result = await sut.execute(productFake)

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryProductOrderRepository.productsOrders.length).toBe(1)
  })
})