import { FastifyRequest, FastifyReply } from "fastify";
import { makeFindByIdPizza } from "../../../factory/pizza/make-findById-pizza";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

export const FindByIdPizzaController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaFindByIdPizza = z.object({
    id: z.string().uuid()
  })

  const { id } = schemaFindByIdPizza.parse(request.params)

  const findByIdPizza = makeFindByIdPizza()

  const result = await findByIdPizza.execute(id)

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(200).send({ data: result.value })
}