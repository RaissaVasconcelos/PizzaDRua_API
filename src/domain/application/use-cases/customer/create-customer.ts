import { Either, left, right } from "../../../../core/either"
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists"
import { Customer } from "../../../enterprise/entities/customer"
import { CustomerRepository } from "../../repositories/customer-repository"
import { BcryptService } from "../../service/bcrypt/bcript-service"

export interface CustomerUseCasesRequest {
  id: string  
  name: string
  email: string
  phone?: string
  password: string
}

type CustomerUseCasesResponse = Either<CustomerAlreadyExistsError, {}>

export class CreateCustomer{
  constructor(
    private customerRepository: CustomerRepository,
    private bcriptyService: BcryptService
    ) {}

  async execute({ email, id, name, password }: CustomerUseCasesRequest): Promise<CustomerUseCasesResponse> {
    const customerAlreadyExists = await this.customerRepository.findByEmail(email)
    
    if (customerAlreadyExists) {
      return left(new CustomerAlreadyExistsError)
    }
    

    const passwordHash = await this.bcriptyService.hashPassword(password, 6)

    const NewCustomer = Customer.create({ email, id, name, password: passwordHash })
    
    await this.customerRepository.create(NewCustomer)

    return right({})
  }
}