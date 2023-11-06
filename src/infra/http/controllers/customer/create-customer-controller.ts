import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { makeCustomerFactorie } from "../../../factory/customer/make-customer";
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";

export const CreateCustomerController = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    id: z.string(),
  })

  const { name, email, password, id } = createBodySchema.parse(request.body)
  
  const customer = makeCustomerFactorie()

  const result = await customer.execute({ name, email, password, id})

  if(result.isLeft()) {
    const error = result.value
    if(error instanceof CustomerAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}