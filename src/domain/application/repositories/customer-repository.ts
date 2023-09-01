import { Customer } from "../../enterprise/entities/customer";

export interface CustomerRepository {
  create(customer: Customer): Promise<Customer>
  findByEmail(email: string): Promise<Customer> 
}