import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateOrder } from "../../../factory/order/make-create-order";
import * as z from 'zod'
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";
import { CreatedOrderError } from "../../../../core/errors/created-order-error";

export const CreateOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaOrder = z.object({
    totalPrice: z.string(),
    payment: z.string(),
    methodDelivery: z.string(), 
    status: z.string(),
    itensOrder: z.array(
      z.object({
        mode: z.enum(["MIXED", "SIMPLE"]),
        product: z.string().array(),
        size: z.string(),
        quantity: z.string(),
    })),
  })

  const { itensOrder, payment, totalPrice, status, methodDelivery } = schemaOrder.parse(request.body)

  const order = makeCreateOrder()

  const customerId = request.user.sign.sub
  console.log('controller', customerId)
  const result = await order.execute(
    { customerId,
      methodDelivery,
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