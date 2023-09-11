import fastify from "fastify";
import { ZodError } from 'zod'
import {fromZodError} from 'zod-validation-error'
import { env } from "./env";

export const app = fastify();


app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
       return  reply.status(400).send({message: 'Validation error', issues: fromZodError(error)})
    }
    if (env.NODE_ENV !== 'prod') {
        console.error(error)
    }
    return reply.status(500).send({ message: 'Internal server error.' })
})