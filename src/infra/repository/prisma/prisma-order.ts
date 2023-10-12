import { prisma } from "../../../lib/prisma";
import { OrderRepository } from "../../../domain/application/repositories/order-repository";
import { Order } from "../../../domain/enterprise/entities";

export class PrismaOrderRepository implements OrderRepository {
  async create({ customerId, totalPrice, itensOrder, payment, status, methodDelivery }: Order): Promise<void> {    
    await prisma.order.create({
      data: { 
        customerId,
        itensOrder,
        status,
        payment,
        totalPrice,
        methodDelivery,
      }
    })
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id }
    })

    if(!order) return null

    return new Order(order)
  }

  async findMany(): Promise<Order[]> {
    const orders = await prisma.order.findMany({})

    const arrOrder = orders.map((order) => new Order(order))

    return arrOrder
  }

  async update({ id, status }: Order): Promise<void> {
    await prisma.order.update({
      where: { id },
      data: { status, updatedAt: new Date() }
    })
  }
}