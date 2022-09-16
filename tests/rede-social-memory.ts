import { randomUUID } from 'crypto';
import { RedeSocial } from '../src/domain/entities/redeSocial';

export const rede_social_1: RedeSocial = RedeSocial.criar(
	{
		nome: 'Facebook',
		url: 'https://www.facebook.com/',
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const rede_social_2: RedeSocial = RedeSocial.criar(
	{
		nome: 'Facebook',
		url: 'https://www.facebook.com/',
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const redesSociais = [rede_social_1, rede_social_2];
