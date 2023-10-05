import fastify from "fastify";
import fastifyExpress from '@fastify/express'
import fastifyJwt from "@fastify/jwt";
import { ZodError } from 'zod'
import {fromZodError} from 'zod-validation-error'
import { env } from "./env";
import { customerRoutes } from "./infra/http/controllers/customer/routes";
import { pixRoutes } from "./infra/http/controllers/efi-pay/router";
export const app = fastify();

app.register(customerRoutes)
app.register(pixRoutes)
app.register(fastifyExpress)
app.register(fastifyJwt, {
    secret: 'secret',
})
app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
       return  reply.status(400).send({message: 'Validation error', issues: fromZodError(error)})
    }
    if (env.NODE_ENV !== 'prod') {
        console.error(error)
    }
    return reply.status(500).send({ message: 'Internal server error.' })
})
