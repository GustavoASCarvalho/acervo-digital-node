import express from 'express';
import { ImagemControlador } from '../app/controllers/imagemControlador';
import { AuthMiddleware } from '../middlewares/auth-middleware';
import multer from 'multer';
import multerConfig from '../config/multer';

const upload = multer(multerConfig);

export const imagemRotas = express.Router();

imagemRotas.get('/listar', new ImagemControlador().search);
imagemRotas.get('/:id', new ImagemControlador().read);
// imagemRotas.use(new AuthMiddleware().middleware);
imagemRotas.patch('/:id', new ImagemControlador().update);
imagemRotas.post('/', upload.single('file'), new ImagemControlador().create);
imagemRotas.delete('/:id', new ImagemControlador().delete);
