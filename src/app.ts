import fastify from "fastify";
import { ZodError } from 'zod'
import {fromZodError} from 'zod-validation-error'
import { env } from "./env";
import { customerRoutes } from "./infra/http/controllers/customer/routes";
export const app = fastify();

app.register(customerRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
       return  reply.status(400).send({message: 'Validation error', issues: fromZodError(error)})
    }
    if (env.NODE_ENV !== 'prod') {
        console.error(error)
    }
    return reply.status(500).send({ message: 'Internal server error.' })
})