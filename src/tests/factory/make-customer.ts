import { Customer, ICustomersProps } from "../../domain/enterprise/entities/customer"


export function makeCustomer (override: Partial<ICustomersProps> = {})  {
    const customer = Customer.create({
        email: "test@email.com",
        phone: "9999-9999",
        username: "username",
        ...override
    })
    return customer
}