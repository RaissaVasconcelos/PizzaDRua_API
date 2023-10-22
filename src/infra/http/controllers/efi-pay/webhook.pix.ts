import { FastifyReply, FastifyRequest } from "fastify";

export const WebHookPixController = async (request: FastifyRequest, reply: FastifyReply) => {

    const response = await new Promise(resolve => setTimeout(resolve, 3000)) 

    return reply.status(200).send(response)
}