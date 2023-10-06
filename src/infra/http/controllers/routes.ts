import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import {
  CreateCustomerController,
  AuthenticateController
} from "./customer";

import {
  CreateProductController,
  FindByIdProductController,
  FindManyProductController,
  UpdateProductController,
  DeleteProductController
} from './product'

import {
  CreateCategoryController,
  DeleteCategoryController,
  FindByIdCategoryController,
  FindManyCategoryController,
  UpdateCategoryController
} from './category'
import { FindManyNeighborhoodController } from "./neighborhood/find-many-neighborhood-controller";
import { CreateNeighborhoodController } from "./neighborhood/create-neighborhood-controller";
import { CreateAddressController } from "./address/create-address-controller";
import { FindManyAddressController } from "./address/find-many-address-controller";

export const Routes = async (app: FastifyInstance) => {

  /* Routes Customer */
  app.post('/sessions', AuthenticateController)
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

  // Routes Neighborhood
  app.get('/neighborhood', FindManyNeighborhoodController)
  app.post('/neighborhood', CreateNeighborhoodController)

  // Routes Address
  app.post('/address', { onRequest: [verifyJWT] }, CreateAddressController)
  app.get('/address', {onRequest: [verifyJWT]}, FindManyAddressController)
}


