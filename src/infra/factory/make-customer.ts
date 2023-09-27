import { PrismaCustomerrepository } from "../repository/prisma/prisma-customer";
import { CreateCustomer } from "../../domain/application/use-cases/customer/create-customer";
import { BcryptServiceImpl } from "../service/bcrypt";

export const makeCustomerFactorie = () => {
  const prismaCustomerRepository = new PrismaCustomerrepository()
  const bcryptServiceImpl = new BcryptServiceImpl() 
  const createCustomer = new CreateCustomer(
    prismaCustomerRepository,
    bcryptServiceImpl,
  )

  return createCustomer
}