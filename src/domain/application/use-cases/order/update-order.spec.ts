import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { makeOrder } from "../../../../tests/factory";
import { InMemoryOrderRepository } from "../../../../tests/in-memory";
import { UpdateOrder } from "./update-order";

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: UpdateOrder

describe('Update Drink', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new UpdateOrder(inMemoryOrderRepository) 
  })

  it('Should be in update Order', async () => {
    const order = makeOrder()

    await inMemoryOrderRepository.create(order)

    const result = await sut.execute(order)
    console.log(result.value)
    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy()
    }
  })

  it('Should be in not update Order', async () => {
    const order = makeOrder()

    await inMemoryOrderRepository.create(order)

    const result = await sut.execute({
      id: 'idFake',
      idCustomer: 'idCustomer',
      idPizza: 'idPizza',
      idSize: 'idSize',
      quantityPizza: '3',
      idDrink: 'idDrink',
      quantityDrink: '2',
      totalPrice: '20',
      status: 'completed'
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})