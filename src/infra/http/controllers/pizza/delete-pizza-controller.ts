import { FastifyRequest, FastifyReply } from "fastify";
import { makeDeletePizza } from "../../../factory/pizza/make-delete-pizza";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

export const DeletePizzaController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaDeletePizza = z.object({
    id: z.string().uuid(), 
  })

  const { id } = schemaDeletePizza.parse(request.params)

  const deletePizza = makeDeletePizza()

  const result = await deletePizza.execute(id)

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(204).send()
}