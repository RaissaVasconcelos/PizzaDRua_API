import { AddressRepository } from "../../../domain/application/repositories/address-repository"
import { Address } from "../../../domain/enterprise/entities"
import { prisma } from "../../../lib/prisma"
import { IAddressList } from "../../../interfaces/IAddressList"

export class PrismaAddressRepository implements AddressRepository {
  async create(address: Address): Promise<Address> {
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

  async find(customerId: string): Promise<Address[]> {
    const address = await prisma.address.findMany({
      where: { customerId }
    })
    console.log('address prisma', address)
    return address!.map((adress) => new Address(adress))
  }

  async findMany(customerId: string): Promise<IAddressList[]> {
    const addresses = await prisma.address.findMany({
      where: {
        customerId,
      },
      select: {
        id: true,
        customerId: true,
        number: true,
        phone: true,
        standard: true,
        street: true,
        zipCode: true,
        neighborhood: {
          select: {
            id: true,
            name: true,
            tax: true              
          }
        }
      }
    })
    return addresses
  }

  async update(address: Address): Promise<void> {
    await prisma.address.update({
      where: { id: address.id },
      data: {
        ...address,
        updatedAt: new Date()
      }
    })
  }

  async findById(id: string): Promise<Address | null> {
    const address = await prisma.address.findUnique({
      where: { id }
    })

    if(!address) return null

    return new Address(address)
  }

  async delete(id: string): Promise<void> {
    await prisma.address.delete({ where: { id } })
  }
} 
