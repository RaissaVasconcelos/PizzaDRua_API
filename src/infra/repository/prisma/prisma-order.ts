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
            name: true,
            email: true,
            phone: true,
            Address: {
              select: {
                type: true,
                street: true,
                number: true,
                phone: true,
                neighborhood: {
                  select: { name: true, tax: true }
                }
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

  async findManyCustomer(customerId: string): Promise<any> {
    const orders = await prisma.order.findMany({
      where: { customerId },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            phone: true,
            Address: {
              select: {
                type: true,
                street: true,
                number: true,
                phone: true,
                neighborhood: {
                  select: { name: true, tax: true }
                }
              }
            },
          } 
        },
      },
    })

    const orderActive = orders.find(order => order.status !== 'FINISHED')

    return orderActive
  }

  async update({ id, status }: Order): Promise<void> {
    await prisma.order.update({
      where: { id },
      data: { status, updatedAt: new Date() }
    })
  }
}