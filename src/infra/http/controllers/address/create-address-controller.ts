import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { MakeCreateAddress } from "../../../factory/address/make-create-address";


export const CreateAddressController = async (request: FastifyRequest, reply: FastifyReply) => {
  const addressBodySchema = z.object({
    street: z.string(),
    number: z.string(),
    phone: z.string(),
    zipCode: z.string(),
    standard: z.boolean().optional(),
    neighborhood: z.string(),
    type: z.enum(['HOME', 'WORK', 'OTHER']),
  })

  const { type, street, number, phone, zipCode, standard, neighborhood } = addressBodySchema.parse(request.body)
  const customerId = request.user.sign.sub
  const makeCreateAddress = MakeCreateAddress()

  const { value, isLeft } = await makeCreateAddress.execute({ 
    type,
    zipCode,
    standard, 
    neighborhood, 
    street, 
    number, 
    phone, 
    customerId 
  })

  if (isLeft()) {
    const error = value
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}