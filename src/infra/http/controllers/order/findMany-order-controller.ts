import { FastifyReply, FastifyRequest } from "fastify";
import { makefindManyOrder } from "../../../factory/order/make-findAll-order";
import { io } from "../../../../utils/socket.io";
import { Server, Socket } from 'socket.io';

export const FindManyOrderController = async (_request: FastifyRequest, reply: FastifyReply) => {
  const order = makefindManyOrder()
  const result = await order.execute()

  if (result.isRight()) {
    io.on('connection', (socket: Socket) => {
      console.log('A user connected');

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });

      // Defina outros manipuladores de eventos Socket.io, conforme necessário
    });
  } else {
    reply.code(500).send({ error: 'Erro na busca de pedidos' });
  }
  
  
}       