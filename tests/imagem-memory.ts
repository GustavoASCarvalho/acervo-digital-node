import { randomUUID } from 'crypto';
import { Imagem } from '../src/domain/entities/imagem';
import { moderador, usuario } from './usuario-memory';

export const usuario_imagem: Imagem = Imagem.criar(
	{
		data: new Date(),
		endereco: 'endereco da imagem',
		eSugestao: true,
		idDoUsuario: usuario.id,
		latitude: '34',
		longitude: '34',
		nome: 'nome da imagem',
		url: 'http://',
		visualizacoes: 3,
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const moderador_imagem: Imagem = Imagem.criar(
	{
		data: new Date(),
		endereco: 'endereco da imagem',
		eSugestao: false,
		idDoUsuario: moderador.id,
		latitude: '34',
		longitude: '34',
		nome: 'nome da imagem',
		url: 'http://',
		visualizacoes: 3,
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const imagens = [usuario_imagem, moderador_imagem];
