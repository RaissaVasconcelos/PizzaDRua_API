import { FastifyReply, FastifyRequest } from "fastify";
import * as tls from 'tls';

export const WebHookPixController = async (request: FastifyRequest, reply: FastifyReply) => {

    if (request.socket.authorized) {
        reply.code(200).send();
    } else {
        reply.code(401).send();
    }

}