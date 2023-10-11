import { CustomerRepository } from "../../repositories/customer-repository";
import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { AddressRepository } from "../../repositories/address-repository";
import { Address } from "../../../enterprise/entities";
import { NeighborhoodRepository } from "../../repositories/neighborhood-repository";

type CustomerUseCasesResponse = Either<ResourceNotFoundError | null, {}>

export class FindByTaxCustomer {
  constructor(
    private customerRepository: CustomerRepository,
    private addressRepository: AddressRepository,
    private neighborhoodRepository: NeighborhoodRepository,
    ) {}

  async execute(id: string): Promise<CustomerUseCasesResponse> {
    const customer = await this.customerRepository.findById(id)

    if(!customer) {
      return left(new ResourceNotFoundError())
    } 

    const adress: Address[] = await this.addressRepository.find(customer.Id)

    if(!adress) {
      return left(null)
    }

    const addressCustomer = adress.find((add: Address) => add.standard)
    console.log(addressCustomer)

    // busca a taxa do bairro

    const taxCustomerValue = this.neighborhoodRepository.findById(addressCustomer!.neighborhoodId)
    console.log('taxValue', taxCustomerValue)
    
    return right({})
  }
}