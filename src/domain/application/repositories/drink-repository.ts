import { Drink } from "../../enterprise/entities/drink";

export interface DrinkRepository {
  create(drink: Drink): Promise<void>
  findById(id: string): Promise<Drink | null>
  findMany(): Promise<Drink[]>
  update(drink: Drink): Promise<void>
  delete(id: string): Promise<void>
}