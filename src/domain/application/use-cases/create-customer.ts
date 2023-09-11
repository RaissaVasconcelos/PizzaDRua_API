import { CustomerAlreadyExistsError } from "../../../core/errors/customer-alreaty-exists"
import { Either, left, right } from "../../../core/either"
import { Customer } from "../../enterprise/entities/customer"
import { CustomerRepository } from "../repositories/customer-repository"

interface CustomerUseCasesRequest {
  id: string
  username: string
  email: string
  phone: string
}

type CustomerUseCasesResponse = Either<CustomerAlreadyExistsError, {}>

export class CreateCustomer{
  constructor(private customerRepository: CustomerRepository) {}

  async execute({ id, email, phone, username }: CustomerUseCasesRequest): Promise<CustomerUseCasesResponse> {
    const customerAlreadyExistsError = await this.customerRepository.findByEmail(email)

    if (customerAlreadyExistsError) {
      return left(new CustomerAlreadyExistsError())
    }
    
    const NewCustomer = Customer.create({ id, email, phone, username })
    
    await this.customerRepository.create(NewCustomer)

    return right({})
  }
}