import { FastifyReply, FastifyRequest } from "fastify";
import { makefindManyOrder } from "../../../factory/order/make-findAll-order";
import { SocketStream } from "@fastify/websocket";

function randomLetter() {
  // Gera um número aleatório entre 0 e 25 (representando as 26 letras do alfabeto)
  const randomIndex = Math.floor(Math.random() * 26);

  // Converte o número em um caractere usando a tabela ASCII
  const randomLetter = String.fromCharCode(65 + randomIndex); // 65 é o código ASCII de 'A'

  return randomLetter;
}
export const FindManyOrderController = async (_request: FastifyRequest, reply: FastifyReply) => {
  const order = makefindManyOrder()
  const result = await order.execute()
  
  reply.code(200).send(result.value?.orders)
  console.log('connected');
  
}       