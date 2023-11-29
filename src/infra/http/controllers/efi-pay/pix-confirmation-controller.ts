import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeCreatePayment } from "../../../factory/payment/make-create-payment";
import app from "../../../../app";

export const PixConfirmationController = async (request: FastifyRequest, reply: FastifyReply) => {

    const pixConfirmationSchemaBody = z.object({
        endToEndId: z.string(),
        txid: z.string(),
        chave: z.string(),
        valor: z.string(),
        horario: z.string(),
    })

    const pixArrayData = z.object({
        pix: z.array(pixConfirmationSchemaBody),
    })

    console.log(request.body, 'pix');
    const { pix } = pixArrayData.parse(request.body)

    const payment = MakeCreatePayment()

    pix.forEach(async (item) => {
        await payment.execute({
            endToEndId: item.endToEndId,
            txid: item.txid,
            key: item.chave,
            value: item.valor,
            time: item.horario
        })

    })
    const roomId = (global as any).privateRoom;

    app.io.emit('payment', { status: 'PaymentConfirmed', roomId });

    return reply.status(200).send()
}
