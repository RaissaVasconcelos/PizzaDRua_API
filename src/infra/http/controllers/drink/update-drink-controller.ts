import { FastifyRequest, FastifyReply } from "fastify";
import { MakeUpdateDrink } from "../../../factory/drink/make-update-drink";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

export const UpdateDrinkController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaUpdatePizza = z.object({
    id: z.string().uuid(), 
    imageUrl: z.string(),
    name: z.string(),
    size: z.string(),
    price: z.string(),
  })

  const { id, name, price, size, imageUrl } = schemaUpdatePizza.parse(request.body)

  const updateDrink = MakeUpdateDrink()

  const result = await updateDrink.execute({ id, name, price, imageUrl, size })

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(200).send()
}