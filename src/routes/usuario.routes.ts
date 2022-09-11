import express from 'express';
import { AutenticacaoControlador } from '../app/controllers/autenticacaoControlador';
import { UsuarioControlador } from '../app/controllers/usuarioControlador';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export const usuarioRotas = express.Router();

usuarioRotas.post('/', new UsuarioControlador().create);
usuarioRotas.post('/autenticar', new AutenticacaoControlador().autenticar);
usuarioRotas.use(new AuthMiddleware().middleware);
usuarioRotas.patch('/:id', new UsuarioControlador().update);
