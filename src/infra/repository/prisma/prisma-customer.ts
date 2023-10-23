import { CustomerRepository } from "../../../domain/application/repositories/customer-repository";
import { Customer } from "../../../domain/enterprise/entities";
import { prisma } from "../../../lib/prisma";

export class PrismaCustomerRepository implements CustomerRepository {
  async create(customer: Customer): Promise<void> {
    await prisma.customer.create({
      data: {
        id: customer.Id,
        name: customer.Name,
        email: customer.Email,
        phone: customer.Phone,
        password: customer.Password
      }
    })
  }

  async createSocialAccount(customer: Customer): Promise<void> {
    await prisma.customer.create({
      data: {
        id: customer.Id,
        name: customer.Name,
        email: customer.Email,
      }
    })
  }
  
  async findByEmail(email: string): Promise<Customer | null> {
    const user = await prisma.customer.findUnique({
      where: { email },
    })

    if(!user) return null

    return new Customer(user)
  }
  
  async findById(id: string): Promise<Customer | null> {
    const user = await prisma.customer.findUnique({
      where: { id }
    })
    
    if(!user) return null

    return new Customer(user)
  }
  
  async delete(id: string): Promise<void> {
    await prisma.customer.delete({ where: { id } })
  }
}