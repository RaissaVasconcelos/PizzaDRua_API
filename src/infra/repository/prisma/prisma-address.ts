import { AddressRepository } from "../../../domain/application/repositories/address-repository"
import { Address } from "../../../domain/enterprise/entities"
import { prisma } from "../../../lib/prisma"

export class PrismaAddressRepository {
  async create(address: Address): Promise<Address> {
    console.log(address, "customer01");

    const newAddress = await prisma.address.create({
      data: {
        number: address.number,
        phone: address.phone,
        type: address.type,
        zipCode: address.zipCode,
        customerId: address.customerId,
        neighborhoodId: address.neighborhoodId,
        street: address.street,
        standard: address.standard
      }
    })
    return new Address(newAddress)
  }

  async findMany(customerId: string): Promise<Address[]> {
    const addresses = await prisma.address.findMany({
      where: {
        customerId
      }
    })
    return addresses.map(address => new Address(address))
  }

} 
