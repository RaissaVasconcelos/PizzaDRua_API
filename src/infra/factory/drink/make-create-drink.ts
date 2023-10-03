import { PrismaDrinkRepository } from "../../repository/prisma/prisma-drink";
import { CreateDrink } from "../../../domain/application/use-cases/product/create-product";

export const MakeCreateDrink = () => {
  const prismaDrinkRepository = new PrismaDrinkRepository()
  const createDrink = new CreateDrink(prismaDrinkRepository)

  return createDrink
}