import { Customer } from "../../enterprise/entities/customer";

export interface CustomerRepository {
  create(customer: Customer): Promise<void>
  findByEmail(email: string): Promise<Customer | null>
  findById(id: string): Promise<Customer | null>
  delete(id: string): Promise<void>
}