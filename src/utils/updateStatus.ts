import { Socket } from "socket.io";
import { PrismaOrderRepository } from "../infra/repository/prisma/prisma-order";
const order = new PrismaOrderRepository()

export const UpdateStatus = async (socket: Socket,  customerId: string) => {
  const updateOrder = await order.findManyCustomer(customerId)
  console.log('pedido atualizado', updateOrder)
  // envia o evento para o cliente conectado
  socket.emit('statusUpdate', updateOrder)
}