import fastify from "fastify";
import fastifyExpress from '@fastify/express'
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from '@fastify/cookie'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'  
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { env } from "./env";
import { Routes } from "./infra/http/controllers/routes";
import cors from '@fastify/cors'
import { resolve } from "path";

export const app = fastify();

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

app.register(multipart)
app.register(cors)
app.register(fastifyCookie)
app.register(fastifyExpress)
app.register(Routes)


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
