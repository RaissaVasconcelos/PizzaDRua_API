import { FastifyReply, FastifyRequest } from "fastify";
import { makefindManyOrder } from "../../../factory/order/make-findAll-order";
// import { SocketStream } from "@fastify/websocket";

// function randomLetter() {
//   // Gera um número aleatório entre 0 e 25 (representando as 26 letras do alfabeto)
//   const randomIndex = Math.floor(Math.random() * 26);

//   // Converte o número em um caractere usando a tabela ASCII
//   const randomLetter = String.fromCharCode(65 + randomIndex); // 65 é o código ASCII de 'A'

//   return randomLetter;
// }

export const FindManyOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const customerId = request.user.sign.sub
  const role = request.query
  
  const order = makefindManyOrder()

  const orders = await order.execute(role, customerId)

  return reply.code(200).send(orders.value)
}

