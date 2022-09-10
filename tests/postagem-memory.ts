import { randomUUID } from 'crypto';
import { Postagem } from '../src/domain/entities/postagem';
import { moderador, usuario } from './usuario-memory';

export const usuario_postagem: Postagem = Postagem.criar(
	{
		descricao: 'descricao postagem',
		eSugestao: true,
		idDoUsuario: usuario.id,
		texto: 'texto da postagem',
		titulo: 'titulo da postagem',
		visualizacoes: 3,
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const moderador_postagem: Postagem = Postagem.criar(
	{
		descricao: 'descricao postagem',
		eSugestao: true,
		idDoUsuario: moderador.id,
		texto: 'texto da postagem',
		titulo: 'titulo da postagem',
		visualizacoes: 3,
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const postagens = [usuario_postagem, moderador_postagem];
