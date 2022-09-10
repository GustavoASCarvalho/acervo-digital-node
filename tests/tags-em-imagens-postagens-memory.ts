import { randomUUID } from 'crypto';
import { TagEmImagensPostagens } from '../src/domain/entities/tagsEmImagensPostagens';
import { moderador_imagem } from './imagem-memory';
import { moderador_postagem } from './postagem-memory';
import { moderador_tag } from './tag-memory';
import { usuario } from './usuario-memory';

export const moderador_tags_em_imagens: TagEmImagensPostagens =
	TagEmImagensPostagens.criar(
		{
			idDaTag: moderador_tag.id,
			idDoUsuario: usuario.id,
			idDaImagem: moderador_imagem.id,
		},
		new Date(),
		new Date(),
		randomUUID(),
		new Date(),
	);

export const moderador_tags_em_postagens: TagEmImagensPostagens =
	TagEmImagensPostagens.criar(
		{
			idDaTag: moderador_tag.id,
			idDoUsuario: usuario.id,
			idDaPostagem: moderador_postagem.id,
		},
		new Date(),
		new Date(),
		randomUUID(),
		new Date(),
	);

export const tags_em_imagens_postagens = [
	moderador_tags_em_imagens,
	moderador_tags_em_postagens,
];
