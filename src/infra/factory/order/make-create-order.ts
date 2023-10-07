import { CreateOrder } from "../../../domain/application/use-cases/order/create-order";
import { PrismaCustomerRepository } from "../../repository/prisma/prisma-customer";
import { PrismaOrderRepository } from "../../repository/prisma/prisma-order";
import { PrismaProductRepository } from "../../repository/prisma/prisma-product";

export const makeCreateOrder = () => {
  const prismaOrderRepository = new PrismaOrderRepository()
  const prismaCustomerRepository = new PrismaCustomerRepository()
  const prismaProductRepository = new PrismaProductRepository()
  const createOrder = new CreateOrder(
    prismaOrderRepository,
    prismaCustomerRepository,
    prismaProductRepository,
    )

  return createOrder
}