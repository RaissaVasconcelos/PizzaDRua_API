import { PrismaDrinkRepository } from "../../repository/prisma/prisma-drink";
import { DeleteDrink } from "../../../domain/application/use-cases/product/delete-product";

export const MakeDeleteDrink = () => {
  const prismaDrinkRepository = new PrismaDrinkRepository()
  const deleteDrink = new DeleteDrink(prismaDrinkRepository)

  return deleteDrink
}