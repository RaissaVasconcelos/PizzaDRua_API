import { DrinkRepository } from "../../../domain/application/repositories/drink-repository";
import { Drink  } from "../../../domain/enterprise/entities";
import { prisma } from "../../../lib/prisma";

export class PrismaDrinkRepository implements DrinkRepository {
  async create(product: Drink): Promise<void> {
    await prisma.drink.create({
      data: { 
        name: product.name.toLowerCase(),
        size: product.size,
        imageUrl: product.imageUrl,
        price: product.price,
      }
    })
  }

  async findById(id: string): Promise<Drink | null> {
    const drink = await prisma.drink.findUnique({
      where: { id }
    })

    if(!drink) return null

    return new Drink(drink)
  }

  async findMany(): Promise<Drink[]> {
    const drinks = await prisma.drink.findMany()
    const arrDrinks = drinks.map(drink => new Drink(drink))
    return arrDrinks
  }

  async update({ id, name, price, size, imageUrl }: Drink): Promise<void> {
    await prisma.drink.update({
      where: { id },
      data: {
        id,
        name,
        price,
        size,
        imageUrl,
        updatedAt: new Date()
      }
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.drink.delete({ where: { id } })
  }
}