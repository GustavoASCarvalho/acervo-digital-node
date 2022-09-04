import express from 'express';
import { AutenticacaoControlador } from '../app/controllers/autenticacaoControlador';
import { UsuarioControlador } from '../app/controllers/usuarioControlador';

export const usuarioRotas = express.Router();

usuarioRotas.post('/', new UsuarioControlador().create);
usuarioRotas.post('/autenticar', new AutenticacaoControlador().autenticar);
