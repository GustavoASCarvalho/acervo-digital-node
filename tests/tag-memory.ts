import { randomUUID } from 'crypto';
import { Tag } from '../src/domain/entities/tag';
import { adiministrador, moderador, usuario } from './usuario-memory';

export const moderador_tag: Tag = Tag.criar(
	{
		idDoUsuario: moderador.id,
		nome: 'tag',
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const adiministrador_tag: Tag = Tag.criar(
	{
		idDoUsuario: adiministrador.id,
		nome: 'tag',
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const tags = [moderador_tag, adiministrador_tag];
