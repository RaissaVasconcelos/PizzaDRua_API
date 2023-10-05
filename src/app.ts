import fastify from "fastify";
import fastifyExpress from '@fastify/express'
import fastifyJwt from "@fastify/jwt";
import { ZodError } from 'zod'
import {fromZodError} from 'zod-validation-error'
import { env } from "./env";
<<<<<<< HEAD
import { customerRoutes } from "./infra/http/controllers/customer/routes";
import { pixRoutes } from "./infra/http/controllers/efi-pay/router";
export const app = fastify();

app.register(customerRoutes)
app.register(pixRoutes)
=======
import { Routes } from "./infra/http/controllers/routes";
export const app = fastify();

>>>>>>> 7324a40db7bd1b82b428699d73f349d67fdaaa59
app.register(fastifyExpress)
app.register(Routes)
app.register(fastifyJwt, {
    secret: 'secret',
})

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
       return  reply.status(400).send({message: 'Validation error', issues: fromZodError(error)})
    }
    if (env.NODE_ENV !== 'prod') {
        console.error(error)
    } else {
        // implemetar logs em ferramentas externas datadog/newRelic/Sentry para validação de erros
    }
    return reply.status(500).send({ message: 'Internal server error.' })
})
