import { PrismaDrinkRepository } from "../../repository/prisma/prisma-drink";
import { DeleteDrink } from "../../../domain/application/use-cases/drink/delete-drink";

export const MakeDeleteDrink = () => {
  const prismaDrinkRepository = new PrismaDrinkRepository()
  const deleteDrink = new DeleteDrink(prismaDrinkRepository)

  return deleteDrink
}