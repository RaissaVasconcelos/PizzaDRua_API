import { InMemoryOrderRepository } from "../../../../tests/in-memory";
import { makeOrder } from "../../../../tests/factory";
import { FindManyOrder } from "./findMany-order";

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: FindManyOrder


describe('FindAll Orders', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new FindManyOrder(inMemoryOrderRepository)
  })

  it('Should be list orders', async () => {
    const orderFake = makeOrder()

    await inMemoryOrderRepository.create(orderFake)

    const result = await sut.execute()

    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryOrderRepository.order.length).toBe(1)
    }
  })
})
