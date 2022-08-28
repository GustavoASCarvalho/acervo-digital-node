import express from 'express';
import { ImagemControlador } from '../controllers/imagemControlador';

export const imagemRotas = express.Router();

const imagemControlador = new ImagemControlador();

imagemRotas.post('/', imagemControlador.create);
