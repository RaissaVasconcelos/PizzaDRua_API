import { InMemoryAddressRepository } from "../../../../tests/in-memory/in-memory-address-repository"
import { CreateAddressUseCase } from "./create-address"
import { InMemoryCustomerRepository } from "../../../../tests/in-memory/in-memory-customer-repository"
import { makeCustomer } from "../../../../tests/factory/make-customer"
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error"

let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryCustomerRepository: InMemoryCustomerRepository
let sut: CreateAddressUseCase

describe("CreateAddressUseCase", () => {
    beforeEach(() => {   
        inMemoryAddressRepository = new InMemoryAddressRepository()
        inMemoryCustomerRepository = new InMemoryCustomerRepository()
        sut = new CreateAddressUseCase(
           inMemoryAddressRepository,
           inMemoryCustomerRepository,
        )
    })

    it('should be able to create a address', async () => {
        const customer = makeCustomer()
        
        await inMemoryCustomerRepository.create(customer)
        const result = await sut.execute({
            customerId: customer.Id,
            street: "Street",
            number: 1,
            complement: "Complement",
            city: "City",
            state: "State",
            zipCode: "ZipCode",
            phone: "Phone",
        })

        if (result.isRight()) {
            expect(result.isRight()).toBeTruthy()
            expect(inMemoryAddressRepository.address.length).toBe(1)
        }

    })

    it('should not be able to create a address with a customer that does not exist', async () => {
        const result = await sut.execute({
            customerId: 'fakeId',
            street: "Street",
            number: 1,
            complement: "Complement",
            city: "City",
            state: "State",
            zipCode: "ZipCode",
            phone: "Phone",
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })

})