import { PrismaDrinkRepository } from "../../repository/prisma/prisma-drink";
import { FindAllDrink } from "../../../domain/application/use-cases/drink/findMany-drink"

export const MakeFindManyDrink = () => {
  const prismaDrinkRepository = new PrismaDrinkRepository()
  const findAllDrink = new FindAllDrink(prismaDrinkRepository)

  return findAllDrink
}