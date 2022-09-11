import { TipoDeCargo } from '../../../domain/entities/usuario';
import { ApiError } from '../../../helpers/types/api-error';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';
import bcrypt from 'bcrypt';

export type AtualizandoUsuarioRequisicao = {
	id: string;
	nome: string;
	email: string;
	senha: string;
	imagemDePerfil: string;
	criadoEm: Date;
	atualizadoEm: Date;
	cargo: TipoDeCargo;
	idDoUsuario: string;
};

export class AtualizandoUsuario {
	constructor(private usuarioRepositorio: UsuarioRepositorio) {}

	async executar({
		nome,
		email,
		senha,
		imagemDePerfil,
		criadoEm,
		atualizadoEm,
		cargo,
		id,
		idDoUsuario,
	}: AtualizandoUsuarioRequisicao) {
		await validacaoDaRequisicao(
			{
				nome,
				email,
				senha,
				imagemDePerfil,
				criadoEm,
				atualizadoEm,
				cargo,
				id,
				idDoUsuario,
			},
			this.usuarioRepositorio,
		);

		senha = await bcrypt.hash(senha, 10);

		const usuario = await this.usuarioRepositorio.update({
			nome,
			email,
			senha,
			imagemDePerfil,
			criadoEm,
			atualizadoEm,
			cargo,
			id,
		});

		return usuario;
	}
}

async function validacaoDaRequisicao(
	{
		nome,
		email,
		senha,
		imagemDePerfil,
		criadoEm,
		atualizadoEm,
		cargo,
		id,
		idDoUsuario,
	}: AtualizandoUsuarioRequisicao,
	usuarioRepositorio: UsuarioRepositorio,
) {
	const campos = {
		id,
		nome,
		email,
		senha,
		imagemDePerfil,
		criadoEm,
		atualizadoEm,
		cargo,
		idDoUsuario,
	};

	for (const [key, value] of Object.entries(campos)) {
		if (value == null || value === undefined) {
			throw new ApiError(`Campo '${key}' ausente na requisição.`, 400);
		}
	}

	if (
		!(email.includes('@') && email.includes('.')) ||
		email.startsWith('@') ||
		email.startsWith('.')
	) {
		throw new ApiError(`Campo 'email' invalido`, 400);
	}

	if (
		!(
			imagemDePerfil.startsWith('http://') ||
			imagemDePerfil.startsWith('https://')
		)
	) {
		throw new ApiError(`Campo 'imagemDePerfil' invalido`, 400);
	}

	const usuario = await usuarioRepositorio.findById(idDoUsuario);
	if (!usuario) {
		throw new ApiError(`Usuario '${idDoUsuario}' não encontrado.`, 404);
	}

	if (
		usuario.props.cargo !== cargo &&
		usuario.props.cargo !== TipoDeCargo.ADIMINISTRADOR
	) {
		throw new ApiError(`Não autorizado.`, 401);
	}
}
