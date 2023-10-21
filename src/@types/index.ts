import '@fastify/jwt'
import 'fastify'
import { Server } from 'socket.io'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sign:{
        sub: string
      }
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}
