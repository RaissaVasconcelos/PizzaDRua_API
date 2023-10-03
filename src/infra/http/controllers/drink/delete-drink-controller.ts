import { FastifyRequest, FastifyReply } from "fastify";
import { MakeDeleteDrink } from "../../../factory/drink/make-delete-drink";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

export const DeleteDrinkController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaDrink = z.object({
    id: z.string().uuid(),
  })

  const { id } = schemaDrink.parse(request.params)

  const drink = MakeDeleteDrink()

  const result = await drink.execute(id)

  if(result.isLeft()) {
    const erro = result.value
    if (erro instanceof ResourceNotFoundError){
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(204).send()
}