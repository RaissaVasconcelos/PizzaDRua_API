import { MakeFindManyNeighborhood } from './../../../factory/neignborhood/make-find-many-neighborhood';
import { FastifyReply, FastifyRequest } from "fastify";


export const FindManyNeighborhoodController = async (request: FastifyRequest, reply: FastifyReply) => {
 
    const makeNeighborhood = MakeFindManyNeighborhood()
    const result = await makeNeighborhood.execute()

    return reply.status(200).send( result.value )
}