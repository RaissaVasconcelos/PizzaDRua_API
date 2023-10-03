import { PrismaDrinkRepository } from "../../repository/prisma/prisma-drink";
import { CreateDrink } from "../../../domain/application/use-cases/drink/create-drink";

export const MakeCreateDrink = () => {
  const prismaDrinkRepository = new PrismaDrinkRepository()
  const createDrink = new CreateDrink(prismaDrinkRepository)

  return createDrink
}