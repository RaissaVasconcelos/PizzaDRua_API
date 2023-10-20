/* eslint-disable @typescript-eslint/no-unused-vars */
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

  async findMany(): Promise<any[]> {
    const orders = await prisma.order.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            Address: {
              where: {
                standard: true,
              },
              select: {
                id: true,
                neighborhood: {
                  select: {
                    name: true,
                    tax: true
                  }
                },
                number: true,
                phone: true,
                street: true,
                type: true,
                zipCode: true,
              }
            },
          } 
        },
      },
    })

    const ordersWithoutCustomerId = orders.map(order => {
      // Crie um novo objeto para cada pedido sem o campo 'customerId'
      const { customerId, ...orderWithoutCustomerId } = order;
      return orderWithoutCustomerId;
    });

    return ordersWithoutCustomerId
  }

  async update({ id, status }: Order): Promise<void> {
    await prisma.order.update({
      where: { id },
      data: { status, updatedAt: new Date() }
    })
  }
}