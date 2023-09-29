import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { makeCustomerFactorie } from "../../../factory/make-customer";
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";

export const CreateCustomerController = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().optional(),
  })

  const { name, email, password, phone } = createBodySchema.parse(request.body)
  
  const customer = makeCustomerFactorie()

  const { value, isLeft } = await customer.execute({ name, email, password, phone})

  if(isLeft()) {
    const erro = value
    if(erro instanceof CustomerAlreadyExistsError) {
      return reply.status(400).send({ message: erro.message })
    }
  }

  return reply.status(201).send()
}