import { AddressRepository } from "../../domain/application/repositories/address-repository";
import { Address } from "../../domain/enterprise/entities/address";


export class InMemoryAddressRepository implements AddressRepository {
  public address: Address[] = []

  async create(address: Address): Promise<void> {
    this.address.push(address)
  }

  async findById(id: string): Promise<Address | null> {
    const address = this.address.find(add => add.id === id)

    if (!address) {
      return null
    }

    return address
  }

  async findMany(): Promise<Address[]> {
    return this.address
  }

  async update(address: Address): Promise<void> {
    const index = this.address.findIndex(add => add.id === address.id)
    if (index >= 0) {
      this.address[index] = address
    }
  }
  
}