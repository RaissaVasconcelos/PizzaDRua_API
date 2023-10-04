import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import {
  CreateCustomerController,
  AuthenticateController } from "./customer";
  
import {
  CreateProductController,
  FindByIdProductController,
  FindManyProductController, 
  UpdateProductController,
  DeleteProductController } from './product'

import {
  CreateCategoryController,
  DeleteCategoryController,
  FindByIdCategoryController,
  FindManyCategoryController,
  UpdateCategoryController } from './category' 

export const Routes = async (app: FastifyInstance) => {
 /* Routes Customer */
 app.post('/sessions',{ onRequest: [verifyJWT] }, AuthenticateController)
 app.post('/customer', CreateCustomerController)

 /* Routes Product */
 app.get('/product/:id', FindByIdProductController)
 app.get('/product', FindManyProductController)
 app.post('/product', CreateProductController)
 app.put('/product', UpdateProductController)
 app.delete('/product/:id', DeleteProductController)
 
  /* Routes Category */
 app.get('/category/:id', FindByIdCategoryController)
 app.get('/category', FindManyCategoryController)
 app.post('/category', CreateCategoryController)
 app.put('/category', UpdateCategoryController)
 app.delete('/category/:id', DeleteCategoryController)
}