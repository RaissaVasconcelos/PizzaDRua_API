import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateOrder } from "../../../factory/order/make-update-order";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

export const UpdateOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaOrder = z.object({
    id: z.string().uuid(),
    customerId: z.string(),
    totalPrice: z.string(),
    payment: z.string(),
    status: z.string(),
    extendedOrdersData: z.array(
      z.object({
        product: z.string().array(),
        size: z.string(),
        quantity: z.string(),
    })),
  })

  const { id, status, customerId, extendedOrdersData, payment, totalPrice } = schemaOrder.parse(request.body)

  const order = makeUpdateOrder()

  const result = await order.execute({ id, status, customerId, extendedOrdersData, payment, totalPrice })

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(200).send({})
}