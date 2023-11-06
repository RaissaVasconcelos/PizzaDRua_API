import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateOrder } from "../../../factory/order/make-update-order";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import app from "../../../../app";
import { makeFindByIdOrder } from "../../../factory/order/make-findById-order";

export const UpdateOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaOrder = z.object({
    id: z.string().uuid(),
    totalPrice: z.string(),
    payment: z.string(),
    customerId: z.string(),
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

  const { id, status, customerId, itensOrder, payment, totalPrice, methodDelivery } = schemaOrder.parse(request.body)

  const order = makeUpdateOrder()
  const orderById = makeFindByIdOrder()  


  const result = await order.execute({ id, status, payment, totalPrice, customerId, methodDelivery, itensOrder })


  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  } 
    const orderUpdate = await orderById.execute(id)
    if (orderUpdate.isRight()) {
      app.io.emit('newOrder', orderUpdate.value.order);
    }

  
    return reply.code(200).send({})
}
