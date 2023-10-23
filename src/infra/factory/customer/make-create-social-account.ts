import { PrismaCustomerRepository } from "../../repository/prisma/prisma-customer";
import { CreateCustomerSocialAccount } from "../../../domain/application/use-cases/customer/create-customer-social-account";

export const makeCustomerSocialAccountFactory = () => {
    const prismaCustomerRepository = new PrismaCustomerRepository()
    
    const createCustomerSocialAccount = new CreateCustomerSocialAccount(
        prismaCustomerRepository
    )

    return createCustomerSocialAccount
}