import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { UploadImageProductController } from "./image-product/upload-image-product-controller";
import {
  CreateCustomerController,
  AuthenticateController,
  RefreshTokenController,
  CreateCustomerSocialAccountController,
  UpdateCustomerController,
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

import {
  CreateOrderController,
  FindByIdOrderController,
  FindManyOrderController,
  UpdateOrderController
} from './order'

import {
  CreateNeighborhoodController,
  FindManyNeighborhoodController,
  DeleteNeighborhoodController,
  FindByIdNeighborhoodController,
  UpdateNeighborhoodController,
} from './neighborhood'

import {
  CreateAddressController,
  DeleteAddressController,
  FindManyAddressController,
  UpdateAddressController,
} from './address'

import { OAuthEfi } from "./efi-pay/pix";
import { WebHookPixController, WebHookVerifyCertificateController } from "./efi-pay/webhook.pix";
import { FindManyDateOrderController } from "./order/find-many-date-orders-controller";
import { verifyUserRole } from "../../middlewares/verifyCustomerRole";
import { PixConfirmationController } from "./efi-pay/pix-confirmation-controller";
import { FetchPixController } from "./efi-pay/fetch-pix-controller";

export const Routes = async (app: FastifyInstance) => {

  /* Routes Customer */
  app.post('/sessions', AuthenticateController)
  app.post('/customer', CreateCustomerController)
  app.post('/sessions/social-login', CreateCustomerSocialAccountController)
  app.patch('/customer', UpdateCustomerController)
  app.patch('/token/refresh', RefreshTokenController)
  


  /* Routes Product */
  app.get('/product/:id', FindByIdProductController)
  app.get('/product', FindManyProductController)
  app.post('/product', CreateProductController)
  app.put('/product' ,UpdateProductController)
  app.delete('/product/:id', DeleteProductController)

  /* Routes Upload Image Product */
  app.post('/upload', UploadImageProductController)

  /* Routes Category */
  app.get('/category/:id', FindByIdCategoryController)
  app.get('/category', FindManyCategoryController)
  app.post('/category', CreateCategoryController)
  app.put('/category', UpdateCategoryController)
  app.delete('/category/:id', DeleteCategoryController)

  /** Route pix */
  app.post('/pix', OAuthEfi)
  app.post('/webhook', WebHookPixController)
  app.post('/config-webhook', WebHookVerifyCertificateController)
  app.post('/pix-confirmation', PixConfirmationController) 
  app.get('/fetch-pix', FetchPixController)

  /** Route Order */
  app.post('/order', CreateOrderController)
  app.get('/order/:id', FindByIdOrderController)
  app.post('/date-order', FindManyDateOrderController)  
  app.get('/order', FindManyOrderController)
  app.put('/order',  UpdateOrderController)

  // Routes Neighborhood
  app.get('/neighborhood', FindManyNeighborhoodController)
  app.post('/neighborhood', CreateNeighborhoodController)
  app.get('/neighborhood/:id', FindByIdNeighborhoodController)
  app.delete('/neighborhood/:id', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, DeleteNeighborhoodController)
  app.put('/neighborhood', UpdateNeighborhoodController)

  // Routes Address
  app.post('/address', CreateAddressController)
  app.get('/address', FindManyAddressController)
  app.delete('/address/:id', DeleteAddressController)
  app.put('/address', UpdateAddressController)

  // // Define a WebSocket route
  // app.get('/websocket', { websocket: true }, (connection, req) => {
    
  //   connection.socket.on('message', async (message) => {
  //     console.log('metodo server says')
  //     console.log('message', message)
  //     // This function will be called when the client sends a message
  //     const status = await prismaOrder.ordersCustomer('d69ac104-a9cb-4036-88ac-6918f0ac7cea')
  //     if (status) {
  //       connection.socket.send(status);
  //       return
  //     }
  //     connection.socket.send('Sem att');
  //   });
    
  //   // Close the WebSocket connection
  //   connection.socket.on('close', () => {
  //     console.log('WebSocket connection closed');
  //   });
  // });
}
