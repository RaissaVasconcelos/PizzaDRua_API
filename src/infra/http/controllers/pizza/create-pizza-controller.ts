import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreatePizza } from "../../../factory/pizza/make-create-pizza";
import * as z from 'zod'
import { ResourceAlreadyExists } from "../../../../core/errors/resource-already-exists";

export const CreatePizzaController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaPizza = z.object({
    imageUrl: z.string(),
    name: z.string(),
    type: z.enum(["TRADITIONAL", "SPECIAL"]),
    description: z.string(),
    price: z.string()
  })

  const { name, price, description, imageUrl, type } = schemaPizza.parse(request.body)

  const pizza = makeCreatePizza()

  const result = await pizza.execute({ name, price, description, imageUrl, type })

  if(result.isLeft()){
    const erro = result.value
    if(erro instanceof ResourceAlreadyExists) {
      return reply.code(409).send({ message: erro.message })
    }
  }

  return reply.code(201).send()
}