import { FastifyRequest, FastifyReply } from "fastify";
import { MakeFindManyDrink } from "../../../factory/drink/make-findMany-drink"; 

export const FindManyDrinkController = async (_request: FastifyRequest, reply: FastifyReply) => {
  const drink = MakeFindManyDrink()

  const result = await drink.execute()

  return reply.code(200).send({ data: result.value })
}