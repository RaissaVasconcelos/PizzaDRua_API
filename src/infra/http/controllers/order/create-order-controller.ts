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
    extendedOrdersData: z.array(
      z.object({
        category: z.string(),
        product: z.string().array(),
        size: z.string(),
        quantity: z.string(),
    })),
  })

  const { customerId, extendedOrdersData, payment, totalPrice, status } = schemaOrder.parse(request.body)

  const order = makeCreateOrder()

  const result = await order.execute(
    { customerId,
      extendedOrdersData,
      payment,
      totalPrice,
      status })
  
  if(result.isLeft()) {
    const erro = result.value
    console.log(erro)
    if(erro instanceof CustomerAlreadyExistsError){
      return reply.code(400).send({ message: erro.message })
    }
    if(erro instanceof CreatedOrderError){
      return reply.code(400).send({ message: erro.message })
    }  
  }
  
  console.log(result)

  return reply.code(201).send()
}