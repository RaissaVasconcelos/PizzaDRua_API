import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateOrder } from "../../../factory/order/make-update-order";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import app from "../../../../app";
import { Socket } from "socket.io";

// refatorar
import { PrismaOrderRepository } from "../../../repository/prisma/prisma-order";
const orderPrisma = new PrismaOrderRepository()

export const UpdateOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaOrder = z.object({
    id: z.string().uuid(),
    totalPrice: z.string(),
    payment: z.string(),
    status: z.enum(["WAITING", "ACCEPTED", "PREPARING", "DELIVERY", "CANCELED", "FINISHED"]),
    methodDelivery: z.string(),
    itensOrder: z.array(
      z.object({
        product: z.string().array(),
        size: z.string(),
        quantity: z.string(),
    })),
  })

  const { id, status, itensOrder, payment, totalPrice, methodDelivery } = schemaOrder.parse(request.body)

  const order = makeUpdateOrder()

  const customerId = request.user.sign.sub

  const result = await order.execute({ id, status, customerId, payment, totalPrice, methodDelivery, itensOrder })

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  } else {   
    const orderUpdate = await orderPrisma.findManyCustomer(customerId)
    console.log(orderUpdate)
    // enviar o novo evento

    app.io.on('connection', (socket) => {
      console.log('Cliente conectado', socket.id)
    
      socket.emit('statusUpdate', orderUpdate);
    
      socket.on('disconnect', () => {
        console.log(`O cliente com o id ${socket.id} se desconectou`)
      });
    })

    return reply.code(200).send({})
  }
}