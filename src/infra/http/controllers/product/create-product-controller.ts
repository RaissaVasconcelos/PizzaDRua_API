import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateProduct } from "../../../factory/product/make-create-product";
import * as z from 'zod'

export const CreateProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaPizza = z.object({
      name: z.string(),
      category: z.string(),
      description: z.string(),
      image: z.string(),
      price: z.string(),
      size: z.string(),
      type: z.enum(["TRADITIONAL", "SPECIAL"]).optional(),
  })

  const { category, name, price, description, image, type, size } = schemaPizza.parse(request.body)

  const product = makeCreateProduct()

  await product.execute({ category, name, price, description, image, type, size })

  return reply.code(201).send()
}