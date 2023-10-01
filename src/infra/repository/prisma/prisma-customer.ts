import { CustomerRepository } from "../../../domain/application/repositories/customer-repository";
import { Customer } from "../../../domain/enterprise/entities";
import { prisma } from "../../../lib/prisma";

export class PrismaCustomerrepository implements CustomerRepository {
  async create(customer: Customer): Promise<void> {
    console.log('customer', customer)
    await prisma.customer.create({
      data: {
        name: customer.Name,
        email: customer.Email,
        phone: customer.Phone,
        password: customer.Password
      }
    })
  }
  
  async findByEmail(email: string): Promise<Customer | null> {
    // const user = await prisma.customer.
    return null
  }
  
  async findById(id: string): Promise<Customer | null> {
    console.log(id)
    return null
  }
  
  async delete(id: string): Promise<void> {
    console.log(id)
  }
}