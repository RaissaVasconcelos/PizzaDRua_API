import { PrismaPizzaRepository } from "../../repository/prisma/prisma-pizza";
import { FindByIdPizza } from "../../../domain/application/use-cases/pizza/findById-pizza";

export const makeFindByIdPizza = () => {
  const prismaPizzaRepository = new PrismaPizzaRepository()
  const findByIdPizza = new FindByIdPizza(prismaPizzaRepository)
  return findByIdPizza
}