import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { makeCustomerFactorie } from "../../../factory/customer/make-customer";
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";

export const CreateCustomerController = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().optional(),
  })

  const { name, email, password, phone } = createBodySchema.parse(request.body)
  console.log(name)  
  const customer = makeCustomerFactorie()

  const { value, isLeft } = await customer.execute({ name, email, password, phone})
  console.log('value', value)

  if(isLeft()) {
    const error = value
    if(error instanceof CustomerAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}