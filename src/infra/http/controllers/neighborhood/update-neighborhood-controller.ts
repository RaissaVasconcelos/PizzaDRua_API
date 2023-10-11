import { MakeUpdateNeighborhood } from '../../../factory/neignborhood/make-update-neighborhood';
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export const UpdateNeighborhoodController = async (request: FastifyRequest, reply: FastifyReply) => {
    const schemaNeighborhood = z.object({
      id: z.string().uuid(),
      name: z.string(),
      tax: z.string(),
    })

    const { id, name, tax } = schemaNeighborhood.parse(request.params)
  
    const makeNeighborhood = MakeUpdateNeighborhood()
    const result = await makeNeighborhood.execute({ id, name, tax })

    if(result.isLeft()) {
      const erro = result.value
      if(erro instanceof ResourceNotFoundError){
        return reply.code(404).send({ message: erro.message })
      }

    }

    return reply.status(200).send( result.value )
}