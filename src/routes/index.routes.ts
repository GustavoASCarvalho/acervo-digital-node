import express from 'express';
import { imagemRotas } from './imagem.routes';
import { usuarioRotas } from './usuario.routes';

export const router = express.Router();

router.use('/imagem', imagemRotas);
router.use('/usuario', usuarioRotas);
