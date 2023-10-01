import { PrismaPizzaRepository } from "../../repository/prisma/prisma-pizza";
import { FindManyPizza } from "../../../domain/application/use-cases/pizza/findMany-pizza";

export const MakeFindManyPizza = () => {
  const prismaRepository = new PrismaPizzaRepository()
  const findManyPizza = new FindManyPizza(prismaRepository)

  return findManyPizza
}