import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../../middlewares/verify-jwt";
import { CreateCustomerController } from "./create-customer-controller";
import { AuthenticateController } from "./authenticate-controller";

export const customerRoutes = async (app: FastifyInstance) => {
  app.post('/customer', CreateCustomerController)
  app.post('/sessions',{ onRequest: [verifyJWT] }, AuthenticateController)
}
