import { Either, right } from "../../../../core/either"
import { Customer } from "../../../enterprise/entities/customer"
import { CustomerRepository } from "../../repositories/customer-repository"

interface CustomerUseCasesRequest {
  username: string
  email: string
  phone: string
}

type CustomerUseCasesResponse = Either<null, {}>

export class CreateCustomer{
  constructor(private customerRepository: CustomerRepository) {}

  async execute({ email, phone, username }: CustomerUseCasesRequest): Promise<CustomerUseCasesResponse> {
    const customerAlreadyExistsError = await this.customerRepository.findByEmail(email)

    if (customerAlreadyExistsError) {
      return right({})
    }
    
    const NewCustomer = Customer.create({ email, phone, username })
    
    await this.customerRepository.create(NewCustomer)

    return right({})
  }
}