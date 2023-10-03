import { PrismaDrinkRepository } from "../../repository/prisma/prisma-drink";
import { UpdateDrink } from "../../../domain/application/use-cases/product/update-product";

export const MakeUpdateDrink = () => {
  const prismaDrinkRepository = new PrismaDrinkRepository()
  const updateDrink = new UpdateDrink(prismaDrinkRepository)

  return updateDrink
}