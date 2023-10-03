import { FastifyRequest, FastifyReply } from "fastify";
import { MakeFindByIdDrink } from "../../../factory/drink/make-findById-drink"; 
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import * as z from 'zod'

export const FindByIdDrinkController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaDrink = z.object({
    id: z.string().uuid(),
  })

  const { id } = schemaDrink.parse(request.params)

  const drink = MakeFindByIdDrink()

  const result = await drink.execute(id)

  if(result.isLeft()) {
    const erro = result.value
    if (erro instanceof ResourceNotFoundError){
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(200).send({ data: result.value })
}