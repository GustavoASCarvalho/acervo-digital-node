import { randomUUID } from 'crypto';
import { TipoDeCargo, Usuario } from '../src/domain/entities/usuario';

export const usuario = Usuario.criar(
	{
		cargo: TipoDeCargo.USUARIO,
		email: 'usuario@gmail.com',
		imagemDePerfil: 'http://',
		nome: 'usuario',
		senha: '12345678',
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const moderador = Usuario.criar(
	{
		cargo: TipoDeCargo.MODERADOR,
		email: 'moderador@gmail.com',
		imagemDePerfil: 'http://',
		nome: 'moderador',
		senha: '12345678',
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const adiministrador = Usuario.criar(
	{
		cargo: TipoDeCargo.ADIMINISTRADOR,
		email: 'adiministrador@gmail.com',
		imagemDePerfil: 'http://',
		nome: 'adiministrador',
		senha: '12345678',
	},
	new Date(),
	new Date(),
	randomUUID(),
	new Date(),
);

export const usuarios = [usuario, moderador, adiministrador];
