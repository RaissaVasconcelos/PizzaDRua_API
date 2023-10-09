import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateOrder } from "../../../factory/order/make-create-order";
import * as z from 'zod'
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";
import { CreatedOrderError } from "../../../../core/errors/created-order-error";

export const CreateOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaOrder = z.object({
    customerId: z.string(),
    totalPrice: z.string(),
    payment: z.string(),
    status: z.string(),
    itensOrder: z.array(
      z.object({
        mode: z.enum(["MIXED", "SIMPLE"]),
        product: z.string().array(),
        size: z.string(),
        quantity: z.string(),
    })),
  })

  const { customerId, itensOrder, payment, totalPrice, status } = schemaOrder.parse(request.body)

  const order = makeCreateOrder()

  const result = await order.execute(
    { customerId,
      itensOrder,
      payment,
      totalPrice,
      status })
  
  if(result.isLeft()) {
    const erro = result.value

    if(erro instanceof CustomerAlreadyExistsError){
      return reply.code(400).send({ message: erro.message })
    }
    if(erro instanceof CreatedOrderError){
      return reply.code(400).send({ message: erro.message })
    }  
  }

  return reply.code(201).send()
}