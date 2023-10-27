import { FastifyReply, FastifyRequest } from "fastify";
import { makefindManyOrder } from "../../../factory/order/make-findAll-order";

export const FindManyOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization;

  if (!token) {
    return reply.status(401).send({ message: 'Token not found' })
  }

  const decodedToken = await request.jwtDecode<{ sub: string }>()
  const customerId = decodedToken.sub
  
  const customerRole = request.query as any
  
  const order = makefindManyOrder()

  const orders = await order.execute({ customerRole, customerId })

  return reply.code(200).send(orders.value?.orders)
}

