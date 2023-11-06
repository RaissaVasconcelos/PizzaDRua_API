import { FastifyReply, FastifyRequest } from "fastify";
import { makefindManyOrder } from "../../../factory/order/make-findAll-order";

export const FindManyOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization;

  const order = makefindManyOrder()
  if (token) {
    const decodedToken = await request.jwtDecode<{ sub: string }>()
    const customerId = decodedToken.sub
    const orders = await order.execute({ customerId })
    return reply.code(200).send(orders.value?.orders)
  }


  const orders = await order.execute({})
  return reply.code(200).send(orders.value?.orders)

}

