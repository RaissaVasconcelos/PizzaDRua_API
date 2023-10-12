import { NeighborhoodRepository } from './../../repositories/neighborhood-repository';
import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Address } from "../../../enterprise/entities/address";
import { AddressRepository } from "../../repositories/address-repository";
import { CustomerRepository } from "../../repositories/customer-repository";

interface CreateAddressUseCaseRequest {
  customerId: string
  type: "HOME"| "WORK" | "OTHER"
  street: string
  number: string
  standard?: boolean
  neighborhood: string
  zipCode: string
  phone: string
}

type CreateAddressUseCaseResponse = Either<ResourceNotFoundError, {}>

export class CreateAddress {
  constructor(
    private addressRepository: AddressRepository,
    private customerRepository: CustomerRepository,
    private neighborhoodRepository: NeighborhoodRepository
  ) { }

  async execute(address: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
  

    const customer = await this.customerRepository.findById(address.customerId)
    const neighborhood = await this.neighborhoodRepository.findByName(address.neighborhood)
    if (!customer) {
      return left(new ResourceNotFoundError())
    }

    if (!neighborhood) {
      return left(new ResourceNotFoundError())
    }

    const addressDefault = await this.addressRepository.findMany(customer.Id)

    const addressStandardExists = addressDefault.some(address => address.standard)  
  
    if (addressStandardExists) {
      const newAddress = Address.create({
        customerId: address.customerId,
        neighborhoodId: neighborhood.id,
        number: address.number,
        street: address.street,
        type: address.type,
        zipCode: address.zipCode,
        standard: false,
        phone: address.phone
      })
      await this.addressRepository.create(newAddress)
    } else {
      const newAddress = Address.create({
        customerId: address.customerId,
        neighborhoodId: neighborhood.id,
        number: address.number,
        street: address.street,
        type: address.type,
        zipCode: address.zipCode,
        standard: true,
        phone: address.phone
      })
      await this.addressRepository.create(newAddress)
    }
    
    return right({})
  }
}
