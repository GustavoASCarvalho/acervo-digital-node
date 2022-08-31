import express from 'express';
import { AutenticacaoControlador } from '../controllers/autenticacaoControlador';
import { UsuarioControlador } from '../controllers/usuarioControlador';

export const usuarioRotas = express.Router();

usuarioRotas.post('/', new UsuarioControlador().create);
usuarioRotas.post('/autenticar', new AutenticacaoControlador().autenticar);
