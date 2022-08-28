import express from 'express';
import { UsuarioControlador } from '../controllers/usuarioControlador';

export const usuarioRotas = express.Router();

usuarioRotas.post('/', new UsuarioControlador().create);
