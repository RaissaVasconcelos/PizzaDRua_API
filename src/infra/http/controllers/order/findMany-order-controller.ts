import { FastifyReply, FastifyRequest } from "fastify";
import { makefindManyOrder } from "../../../factory/order/make-findAll-order";


export const FindManyOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const customerId = request.user.sign.sub
  
  const customerRole = request.query as any
  
  const order = makefindManyOrder()

  const orders = await order.execute({ customerRole, customerId })

  return reply.code(200).send(orders.value)
}

