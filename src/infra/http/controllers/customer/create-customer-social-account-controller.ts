import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { makeCustomerSocialAccountFactory } from "../../../factory/customer/make-create-social-account";

export const CreateCustomerSocialAccountController = async (request: FastifyRequest, reply: FastifyReply) => {
    const createBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        id: z.string(),
    })

    const { name, email, id } = createBodySchema.parse(request.body)

    console.log(name, email, id );
        
    const customer = makeCustomerSocialAccountFactory()

    await customer.execute({ name, email, id })

    return reply.status(201).send()
}