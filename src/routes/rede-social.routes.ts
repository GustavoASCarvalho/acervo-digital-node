import express from 'express';
import { RedeSocialControlador } from '../app/controllers/redeSocialControlador';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export const redeSocialRotas = express.Router();

redeSocialRotas.use(new AuthMiddleware().middleware);
redeSocialRotas.post('/', new RedeSocialControlador().create);
