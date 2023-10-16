import { MakeFindManyNeighborhood } from '../../../factory/neignborhood/make-findMany-neighborhood';
import { FastifyReply, FastifyRequest } from "fastify";


export const FindManyNeighborhoodController = async (_request: FastifyRequest, reply: FastifyReply) => {
    const makeNeighborhood = MakeFindManyNeighborhood()
    const result = await makeNeighborhood.execute()

    return reply.status(200).send(result.value?.neighborhoods)
}