import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../../middlewares/verify-jwt";
import {OAuthEfi } from "./pix";


export const pixRoutes = async (app: FastifyInstance) => {
    app.post('/pix', OAuthEfi)
}
