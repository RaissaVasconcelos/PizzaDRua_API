import { FastifyReply, FastifyRequest } from 'fastify'

export const verifyJWT = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    console.log('verijwt', await request.jwtVerify())
    return await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({ message: 'Unathorized' })
  }
}