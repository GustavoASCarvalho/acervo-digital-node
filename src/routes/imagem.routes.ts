import express from 'express';
import { ImagemControlador } from '../controllers/imagemControlador';

export const imagemRotas = express.Router();

imagemRotas.post('/', new ImagemControlador().create);
