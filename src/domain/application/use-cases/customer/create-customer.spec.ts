import { InMemoryCustomerRepository } from "../../../../tests/in-memory";
import { makeCustomer } from "../../../../tests/factory/make-customer";
import { CreateCustomer } from "./create-customer";

let inMemoryCustomerRepository: InMemoryCustomerRepository
let sut: CreateCustomer

describe('Create Customer', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    sut = new CreateCustomer(inMemoryCustomerRepository)
  })

  it('Should be able create a customer', async () => {
    const customerFake = makeCustomer()

    const customer = await sut.execute({
      username: customerFake.Username,
      email: customerFake.Email,
      phone: customerFake.Phone,
    })

    if(customer.isRight()) {
      expect(customer.isRight()).toBeTruthy()
      expect(inMemoryCustomerRepository.customers.length).toBe(1)
    }
  })
})