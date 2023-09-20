import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Address, TypeAddress } from "../../../enterprise/entities/address";
import { AddressRepository } from "../../repositories/address-repository";
import { CustomerRepository } from "../../repositories/customer-repository";


interface CreateAddressUseCaseRequest {
  customerId: string
  type: TypeAddress
  street: string
  number: string
  neighborhood: string
  zipCode: string
  phone: string
}

type CreateAddressUseCaseResponse = Either<ResourceNotFoundError, {}>

export class CreateAddress {
  constructor(
    private addressRepository: AddressRepository,
    private customerRepository: CustomerRepository
  ) { }

  async execute(address: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const customer = await this.customerRepository.findById(address.customerId)

    if (!customer) {
      return left(new ResourceNotFoundError())
    }

    const newAddress = Address.create(address)

    await this.addressRepository.create(newAddress)

    return right({})
  }
}