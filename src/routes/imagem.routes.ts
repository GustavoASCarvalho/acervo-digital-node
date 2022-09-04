import express from 'express';
import { ImagemControlador } from '../app/controllers/imagemControlador';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export const imagemRotas = express.Router();

imagemRotas.use(new AuthMiddleware().middleware);
imagemRotas.post('/', new ImagemControlador().create);
imagemRotas.delete('/:id', new ImagemControlador().delete);
