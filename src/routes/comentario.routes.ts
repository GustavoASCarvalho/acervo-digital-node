import express from 'express';
import { ComentarioControlador } from '../app/controllers/comentarioControlador';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export const comentarioRotas = express.Router();

comentarioRotas.use(new AuthMiddleware().middleware);
comentarioRotas.post('/', new ComentarioControlador().create);
