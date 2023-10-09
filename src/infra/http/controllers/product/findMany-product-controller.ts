import { FastifyReply, FastifyRequest } from "fastify";
import { MakeFindManyProduct } from "../../../factory/product/make-findMany-product";

export const FindManyProductController = async (_request: FastifyRequest, reply: FastifyReply) => {  
  const products = MakeFindManyProduct()

  const result = await products.execute()
  
  return reply.code(200).send({ data: result.value, meta: {} })
}