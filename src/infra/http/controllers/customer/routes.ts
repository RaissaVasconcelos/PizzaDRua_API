import { FastifyInstance } from "fastify";
import { CreateCustomerController } from "./create-customer-controller";

export const customerRoutes = async (app: FastifyInstance) => {
  app.post('/customer', CreateCustomerController)
}