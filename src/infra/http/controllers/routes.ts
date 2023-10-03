import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import {
  CreateCustomerController,
  AuthenticateController } from "./customer";
import {
  CreatePizzaController,
  FindByIdPizzaController,
  FindManyPizzaController, 
  UpdatePizzaController,
  DeletePizzaController } from './pizza'
import {
  CreateDrinkController,
  FindByIdDrinkController,
  FindManyDrinkController,
  UpdateDrinkController,
  DeleteDrinkController } from './drink'

export const Routes = async (app: FastifyInstance) => {
 /* Routes Customer */
 app.post('/sessions',{ onRequest: [verifyJWT] }, AuthenticateController)
 app.post('/customer', CreateCustomerController)

 /* Routes Pizza */
 app.get('/pizza/:id', FindByIdPizzaController)
 app.get('/pizza', FindManyPizzaController)
 app.post('/pizza', CreatePizzaController)
 app.put('/pizza', UpdatePizzaController)
 app.delete('/pizza/:id', DeletePizzaController)
 
 /* Routes Drinks */
 app.get('/drink/:id', FindByIdDrinkController)
 app.get('/drink', FindManyDrinkController)
 app.post('/drink', CreateDrinkController)
 app.put('/drink', UpdateDrinkController)
 app.delete('/drink/:id', DeleteDrinkController)
}