import { DrinkRepository } from "../../domain/application/repositories/drink-repository";
import { Drink } from "../../domain/enterprise/entities/drink";


export class InMemoryDrinkRepository implements DrinkRepository {
  public drinks: Drink[] = []
  
  async create(drink: Drink): Promise<void> {
    this.drinks.push(drink)
  }

  async findById(id: string): Promise<Drink | null> {
    const drink = this.drinks.find(drink => drink.id === id)

    if (!drink) {
      return null
    }

    return drink
  }

  async findMany(): Promise<Drink[]> {
    return this.drinks
  }

  async update(drinkUpdate: Drink): Promise<void> {
    const index = this.drinks.findIndex(drink => drink.id === drinkUpdate.id)

    if (index >= 0) {
      this.drinks[index] = drinkUpdate
    }
  }

  async delete(id: string): Promise<void> {
    const drinkDeletd = this.drinks.filter(drink => drink.id !== id)
    this.drinks = drinkDeletd
  }
}