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

<<<<<<< HEAD
=======
declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}
>>>>>>> b406a43ec29c4bd6983b3f2cbbc023335adc4867
