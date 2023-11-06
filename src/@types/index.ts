import '@fastify/jwt'
import 'fastify'
import { Server } from 'socket.io'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}

export interface OrderCustomer {
  socketId: string
  orderRoom: string
}