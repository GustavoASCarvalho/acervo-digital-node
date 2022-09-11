import express from 'express';
import { ImagemControlador } from '../app/controllers/imagemControlador';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export const imagemRotas = express.Router();

imagemRotas.get('/listar', new ImagemControlador().search);
imagemRotas.get('/:id', new ImagemControlador().read);
imagemRotas.use(new AuthMiddleware().middleware);
imagemRotas.patch('/:id', new ImagemControlador().update);
imagemRotas.post('/', new ImagemControlador().create);
imagemRotas.delete('/:id', new ImagemControlador().delete);
