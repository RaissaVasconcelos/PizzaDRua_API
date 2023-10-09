import { FastifyReply, FastifyRequest } from "fastify";
import { makefindManyOrder } from "../../../factory/order/make-findAll-order";

export const FindManyOrderController = async (_request: FastifyRequest, reply: FastifyReply) => {
  const order = makefindManyOrder()

  const orders = await order.execute()

  return reply.code(200).send({ data: orders.value })
}