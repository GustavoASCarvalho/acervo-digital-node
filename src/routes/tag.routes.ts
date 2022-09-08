import express from 'express';
import { TagControlador } from '../app/controllers/tagControlador';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export const tagRotas = express.Router();

tagRotas.use(new AuthMiddleware().middleware);
tagRotas.post('/', new TagControlador().create);
