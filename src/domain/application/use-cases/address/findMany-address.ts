import { Either, left, right } from "../../../../core/either";
import { AddressRepository } from "../../repositories/address-repository";
import { Address } from "../../../enterprise/entities";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type AddressUseCasesResponse = Either<ResourceNotFoundError, { address: Address[] }>

export class FindManyAddress {
  constructor(
    private addressRepository: AddressRepository
  ) {}

  async execute(): Promise<AddressUseCasesResponse> {
    const address = await this.addressRepository.findMany()

    if (!address) {
      return left(new ResourceNotFoundError())
    }

    return right({ address })
  }
}