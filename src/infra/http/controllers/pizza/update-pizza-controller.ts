import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdatePizza } from "../../../factory/pizza/make-update-pizza";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

export const UpdatePizzaController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaUpdatePizza = z.object({
    id: z.string().uuid(), 
    imageUrl: z.string(),
    name: z.string(),
    type: z.enum(["TRADITIONAL", "SPECIAL"]),
    price: z.string(),
    description: z.string(),
  })

  const { id, name, price, description, imageUrl, type } = schemaUpdatePizza.parse(request.body)

  const updatePizza = makeUpdatePizza()

  const result = await updatePizza.execute({ id, name, price, description, imageUrl, type })

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(200).send()
}