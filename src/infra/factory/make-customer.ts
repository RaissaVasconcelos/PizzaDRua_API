import { PrismaCustomerrepository } from "../repository/prisma/prisma-customer";
import { CreateCustomer } from "../../domain/application/use-cases/customer/create-customer";

export const makeCustomerFactorie = () => {
  const prismaCustomerRepository = new PrismaCustomerrepository()
  const createCustomer = new CreateCustomer(
    prismaCustomerRepository
  )

  return createCustomer
}