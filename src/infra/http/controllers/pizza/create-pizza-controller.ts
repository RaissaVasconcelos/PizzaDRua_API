import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreatePizza } from "../../../factory/pizza/make-create-pizza";
import * as z from 'zod'

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

  await pizza.execute({ name, price, description, imageUrl, type })

  return reply.code(201).send()
}