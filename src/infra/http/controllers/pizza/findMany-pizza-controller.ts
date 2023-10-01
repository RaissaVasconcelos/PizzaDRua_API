import { FastifyReply, FastifyRequest } from "fastify";
import { MakeFindManyPizza } from "../../../factory/pizza/make-findAll-pizza";

export const FindManyPizzaController = async (_request: FastifyRequest, reply: FastifyReply) => {  
  const pizzas = MakeFindManyPizza()

  const result = await pizzas.execute()

  return reply.code(200).send({ data: result.value })
}