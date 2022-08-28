import express from 'express';
import { UsuarioControlador } from '../controllers/usuarioControlador';

export const usuarioRotas = express.Router();

const imagemControlador = new UsuarioControlador();

usuarioRotas.post('/', imagemControlador.create);
