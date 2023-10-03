import { PrismaDrinkRepository } from "../../repository/prisma/prisma-drink";
import { FindByIdDrink } from "../../../domain/application/use-cases/drink/findById-drink";

export const MakeFindByIdDrink = () => {
  const prismaDrinkRepository = new PrismaDrinkRepository()
  const findByIdDrink = new FindByIdDrink(prismaDrinkRepository)

  return findByIdDrink
}