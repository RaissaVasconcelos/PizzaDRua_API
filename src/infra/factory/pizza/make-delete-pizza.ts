import { PrismaPizzaRepository } from "../../repository/prisma/prisma-pizza";
import { DeletePizza } from "../../../domain/application/use-cases/pizza/delete-pizza";

export const makeDeletePizza = () => {
  const prismaPizzaRepository = new PrismaPizzaRepository()
  const deletePizza = new DeletePizza(prismaPizzaRepository)
  return deletePizza
}