import { PrismaPizzaRepository } from "../../repository/prisma/prisma-pizza";
import { CreatePizza } from "../../../domain/application/use-cases/pizza/create-pizza";

export const makeCreatePizza = () => {
  const prismaPizzaRepository = new PrismaPizzaRepository()
  const createPizza = new CreatePizza(prismaPizzaRepository)

  return createPizza
}