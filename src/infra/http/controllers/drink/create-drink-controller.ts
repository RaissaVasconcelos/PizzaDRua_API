import { FastifyRequest, FastifyReply } from "fastify";
import { MakeCreateDrink } from "../../../factory/drink/make-create-drink"; 
import * as z from 'zod'
import { ResourceAlreadyExists } from "../../../../core/errors/resource-already-exists";

export const CreateDrinkController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaDrink = z.object({
    name: z.string(),
    size: z.string(),
    price: z.string(),
    imageUrl: z.string(),
  })

  const { name, price, size, imageUrl } = schemaDrink.parse(request.body)

  const drink = MakeCreateDrink()

  const result = await drink.execute({ name, price, size, imageUrl })

  if(result.isLeft()){
    const erro = result.value
    if(erro instanceof ResourceAlreadyExists) {
      return reply.code(409).send({ message: erro.message })
    }
  }

  return reply.code(201).send()
}