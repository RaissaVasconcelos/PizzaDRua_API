import { Either, right } from "../../../../core/either"
import { Customer } from "../../../enterprise/entities/customer"
import { CustomerRepository } from "../../repositories/customer-repository"

export interface CustomerUseCasesRequest {
    id: string    
    name: string
    email: string
}

type CustomerUseCasesResponse = Either<null, {}>

export class CreateCustomerSocialAccount {
    constructor(
        private customerRepository: CustomerRepository,
       
    ) { }

    async execute({ email, name, id  }: CustomerUseCasesRequest): Promise<CustomerUseCasesResponse> {
        const customerAlreadyExists = await this.customerRepository.findByEmail(email)

        if (customerAlreadyExists) {
            return right({})
        }
        
        const NewCustomer = Customer.create({ email, name, id })
        
        await this.customerRepository.createSocialAccount(NewCustomer)

        return right({})
    }
}