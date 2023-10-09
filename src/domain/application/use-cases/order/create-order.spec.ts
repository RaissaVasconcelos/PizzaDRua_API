import { InMemoryOrderRepository, InMemoryCustomerRepository, InMemoryProductRepository } from '../../../../tests/in-memory'
import { makeCustomer } from '../../../../tests/factory'
import { CreateOrder } from './create-order'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryCustomerRepository: InMemoryCustomerRepository
let inMemoryProductRepository: InMemoryProductRepository
let sut: CreateOrder

describe('CreateOrderUseCase', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new CreateOrder(
      inMemoryOrderRepository,
      inMemoryCustomerRepository,
      inMemoryProductRepository,
    )
  })
  
  it('should be able to create a order', async () => {
    const customer = makeCustomer()

    await inMemoryCustomerRepository.create(customer)

    const resultOrder = await sut.execute({
      idCustomer: customer.Id,
      idPizza: 'ANY32',
      idSize: 'ANY98',
      quantityPizza: '2',
      idDrink: 'ANY767',
      quantityDrink: '2',
      totalPrice: '20,0',
      status: 'completed',
    })

    if(resultOrder.isRight()){
      expect(resultOrder.isRight()).toBeTruthy()
      expect(inMemoryOrderRepository.order.length).toBe(1)
    }
  }) 

  it('should not be able to create in order with is customer that does not exists', async () => {
    const resultOrder = await sut.execute({
      idCustomer: 'fakeId',
      idPizza: 'ANY32',
      idSize: 'ANY98',
      quantityPizza: '2',
      idDrink: 'ANY767',
      quantityDrink: '2',
      totalPrice: '20,0',
      status: 'completed',
    })

    expect(resultOrder.isLeft()).toBeTruthy()
    expect(resultOrder.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

