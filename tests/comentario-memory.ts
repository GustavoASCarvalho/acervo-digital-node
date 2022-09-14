import { randomUUID } from 'crypto';
import { Comentario } from '../src/domain/entities/comentario';
import { moderador, usuario } from './usuario-memory';
import { usuario_imagem } from './imagem-memory';
import { usuario_postagem } from './postagem-memory';

export const imagem_comentario: Comentario = Comentario.criar(
	{
		idDoUsuario: usuario.id,
		texto: 'texto do comentario',
		titulo: 'titulo do comentario',
		idDaImagem: usuario_imagem.id,
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const postagem_comentario: Comentario = Comentario.criar(
	{
		idDoUsuario: moderador.id,
		texto: 'texto do comentario',
		titulo: 'titulo do comentario',
		idDaPostagem: usuario_postagem.id,
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const comentarios = [imagem_comentario, postagem_comentario];
