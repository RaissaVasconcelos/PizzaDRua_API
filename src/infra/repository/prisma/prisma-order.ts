/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "../../../lib/prisma";
import { OrderRepository } from "../../../domain/application/repositories/order-repository";
import { Order } from "../../../domain/enterprise/entities";
import { OrderData } from "../../../interfaces/IOrderList";

export class PrismaOrderRepository implements OrderRepository {
  async create({ customerId, totalPrice, itensOrder, payment, status, methodDelivery }: Order): Promise<Order> {    
    const order =  await prisma.order.create({
      data: { 
        customerId,
        itensOrder,
        status,
        payment,
        totalPrice,
        methodDelivery,
      }
    })

    return new Order(order)
  }

  async findById(id: string): Promise<any | null> {
    const order = await prisma.order.findUnique({
      where: { id }, select: {
        customer: {
          select: {
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
            email: true,
            name: true,
            phone: true,  
            id: true,
          }

        },
        itensOrder:true,
        id: true,
        methodDelivery: true,
        payment: true,
        status: true,
        totalPrice: true
      }
    })

    if(!order) return null

    return order
  }

  async findMany(): Promise<any[]> {
    console.log('findMany');
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
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

  

    const ordersWithoutCustomerId = orders.map(order => {
      // Crie um novo objeto para cada pedido sem o campo 'customerId'
      const { customerId, ...orderWithoutCustomerId } = order;
      return orderWithoutCustomerId;
    });

    return ordersWithoutCustomerId
  }

  async findManyData(date: string): Promise<OrderData[]> {
   const formattedDate = date.split('T')[0];
    
   const orders: OrderData[] = await prisma.$queryRaw`
    SELECT
      o.id as "orderId",
      o."customerId",
      o.status,
      o."methodDelivery",
      o.payment,
      o."totalPrice",
      o."itensOrder",
      o."createdAt" as "orderCreatedAt",
      c.id as "customerId",
      c.name as "customerName",
      c.email as "customerEmail",
      c.phone as "customerPhone",
      a.id as "addressId",
      a.number as "addressNumber",
      a.phone as "addressPhone",
      a.street as "addressStreet",
      a.type as "addressType",
      a."zipCode" as "addressZipCode",
      n.name as "neighborhoodName",
      n.tax as "neighborhoodTax"
    FROM "Order" o
    JOIN "Customer" c ON o."customerId" = c.id
    LEFT JOIN "Address" a ON c.id = a."customerId" AND a.standard = true
    LEFT JOIN "Neighborhood" n ON a."neighborhoodId" = n.id
    WHERE DATE(o."createdAt") = to_date(${formattedDate}, 'YYYY-MM-DD')
  `;

   return orders;
 }
   
  async findManyCustomer(customerId: string): Promise<any> {
    
    const orders = await prisma.order.findMany({
      where: { customerId },
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
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return orders
  }

  async update({ id, status }: Order): Promise<void> {
    await prisma.order.update({
      where: { id },
      data: { status, updatedAt: new Date() }
    })
  }
}