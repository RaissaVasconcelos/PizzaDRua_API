import fastify from "fastify";
import fastifyExpress from '@fastify/express'
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from '@fastify/cookie'
import fastifyWebsocket from "@fastify/websocket";
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { env } from "./env";
import { Routes } from "./infra/http/controllers/routes";
import cors from '@fastify/cors'
import { resolve } from "path";
import fastifyIO from "fastify-socket.io";
import { OrderCustomer } from "./@types";

const app = fastify();
export const socketToOrderMap: OrderCustomer[] = [];

app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
})

app.register(fastifyIO, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '1d'
  }
})

app.register((fastifyStatic), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
})

app.register(fastifyWebsocket, { options: { clientTracking: true } })
app.register(multipart)
app.register(fastifyCookie)
app.register(fastifyExpress)
app.register(Routes)


app.ready((err) => {
  if (err) throw err

  app.io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id)
    socket.on('newOrder', (data) => {
      const { orderRoom } = data
      socket.join(orderRoom)     
      const userOrder = socketToOrderMap.find(user => user.orderRoom === orderRoom)
      if (userOrder) {
        userOrder.socketId = socket.id
      }else {
        socketToOrderMap.push({ socketId: socket.id,  orderRoom })
      }
      
    });
    
    socket.on('statusUpdate', (data) => {
      const { orderId } = data
      socket.to(orderId).emit('statusUpdate', data)
    })

    socket.on('disconnect', () => {
      console.log(`O cliente com o id ${socket.id} se desconectou`)
     
      });
  })
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error', issues: fromZodError(error) })
  }
  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // implemetar logs em ferramentas externas datadog/newRelic/Sentry para validação de erros
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})

export default app