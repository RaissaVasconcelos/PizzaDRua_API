import { FastifyReply, FastifyRequest } from "fastify";

export const WebHookPixController = async (request: FastifyRequest, reply: FastifyReply) => {

    await new Promise(resolve => setTimeout(resolve, 5000)) 

    return reply.status(200).send('ok')
}