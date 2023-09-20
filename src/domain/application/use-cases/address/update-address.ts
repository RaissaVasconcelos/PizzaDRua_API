import { Either, left, right } from "../../../../core/either";
import { AddressRepository } from "../../repositories/address-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Address, TypeAddress } from "../../../enterprise/entities";

interface AddressUseCaseRequest {
  id: string
  customerId: string
  type: TypeAddress
  street: string
  number: string
  neighborhood: string
  zipCode: string
  phone: string
}

type AddressUseCasesResponse = Either<ResourceNotFoundError, {}>

export class UpdateAddress {
  constructor(private addressRepository: AddressRepository) {}

  async execute(addressUpdate: AddressUseCaseRequest): Promise<AddressUseCasesResponse> {
    const id = await this.addressRepository.findById(addressUpdate.id)

    if (!id) {
      return left(new ResourceNotFoundError())
    }

    const newAddress = Address.create(addressUpdate)

    await this.addressRepository.update(newAddress)

    return right({})
  }
}