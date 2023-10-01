import { prisma } from "../../../lib/prisma";
import { PizzaRepository } from "../../../domain/application/repositories/pizza-repository";
import { Pizza } from "../../../domain/enterprise/entities";

export class PrismaPizzaRepository implements PizzaRepository {
  async create(product: Pizza): Promise<void> {
    await prisma.pizza.create({
      data: { 
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        description: product.description,
        type: product.type,
      }
    })
  }

  async findById(id: string): Promise<Pizza | null> {
    const pizza = await prisma.pizza.findUnique({
      where: { id }
    })

    if(!pizza) return null

    return new Pizza(pizza)
  }

  async findMany(): Promise<Pizza[]> {
    const pizzas = await prisma.pizza.findMany()
    const arrPizzas = pizzas.map(pizza => new Pizza(pizza))
    return arrPizzas
  }

  async update({ id, name, price, type, description, imageUrl }: Pizza): Promise<void> {
    await prisma.pizza.update({
      where: { id },
      data: {
        id,
        name,
        price,
        type,
        description,
        imageUrl,
        updatedAt: new Date()
      }
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.pizza.delete({ where: { id } })
  }
}