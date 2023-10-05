import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateProduct } from "../../../factory/product/make-update-product";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import * as z from 'zod'

export const UpdateProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaUpdateProduct = z.object({
    id: z.string().uuid(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.string(),
    size: z.string(),
    type: z.enum(["TRADITIONAL", "SPECIAL"]).optional(),
  })

  const { id, name, category, price, description, image, type, size } = schemaUpdateProduct.parse(request.body)

  const updateProduct = makeUpdateProduct()

  const result = await updateProduct.execute({ id, name, category, price, description, image, type, size })

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(200).send()
}