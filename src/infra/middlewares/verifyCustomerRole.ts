import { FastifyReply, FastifyRequest } from 'fastify'

export const verifyUserRole = (roleToVerify: 'ADMIN' | 'CUSTOMER' | 'COMPANIE') => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { type } = request.user

        if (type !== roleToVerify) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }
    }
}