import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateOrder } from "../../../factory/order/make-update-order";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import app from "../../../../app";

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
        mode: z.enum(["MIXED", "SIMPLE"]),
        product: z.string().array(),
        price: z.string(),  
        size: z.enum(["ENTIRE", "HALF"]).optional(),
        quantity: z.number(),
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
    // enviar o evento pelo socket atualizado
    app.io.emit('statusUpdate', orderUpdate);

    return reply.code(200).send({})
  }
}