import { PrismaPizzaRepository } from "../../repository/prisma/prisma-pizza";
import { UpdatePizza } from "../../../domain/application/use-cases/pizza/update-pizza";

export const makeUpdatePizza = () => {
  const prismaPizzaRepository = new PrismaPizzaRepository()
  const updatePizza = new UpdatePizza(prismaPizzaRepository)
  return updatePizza
}