import { TipoDeCargo, Usuario } from '../../../domain/entities/usuario';
import { ApiError } from '../../../helpers/types/api-error';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';
import bcrypt from 'bcrypt';

export type CriandoUsuarioRequisicao = {
	nome: string;
	email: string;
	senha: string;
	imagemDePerfil: string;
	criadoEm: Date;
	atualizadoEm: Date;
};

export class CriandoUsuario {
	constructor(private usuarioRepositorio: UsuarioRepositorio) {}

	async executar({
		nome,
		email,
		senha,
		imagemDePerfil,
		criadoEm,
		atualizadoEm,
	}: CriandoUsuarioRequisicao) {
		await validacaoDaRequisicao({
			nome,
			email,
			senha,
			imagemDePerfil,
			criadoEm,
			atualizadoEm,
		});

		senha = await bcrypt.hash(senha, 10);

		const usuario = Usuario.criar(
			{
				nome,
				cargo: TipoDeCargo.USUARIO,
				email,
				imagemDePerfil,
				senha,
			},
			criadoEm,
			atualizadoEm,
		);

		await this.usuarioRepositorio.create(usuario);

		return usuario;
	}
}

async function validacaoDaRequisicao({
	nome,
	email,
	senha,
	imagemDePerfil,
	criadoEm,
	atualizadoEm,
}: CriandoUsuarioRequisicao) {
	if (!nome) {
		throw new ApiError(`Campo 'nome' ausente na requisição.`, 400);
	}
	if (!email) {
		throw new ApiError(`Campo 'email' ausente na requisição.`, 400);
	} else if (
		!(email.includes('@') && email.includes('.')) ||
		email.startsWith('@') ||
		email.startsWith('.')
	) {
		throw new ApiError(`Campo 'email' invalido`, 400);
	}
	if (!senha) {
		throw new ApiError(`Campo 'senha' ausente na requisição.`, 400);
	}
	if (!imagemDePerfil) {
		throw new ApiError(`Campo 'imagemDePerfil' ausente na requisição.`, 400);
	} else if (
		!(
			imagemDePerfil.startsWith('http://') ||
			imagemDePerfil.startsWith('https://')
		)
	) {
		throw new ApiError(`Campo 'imagemDePerfil' invalido`, 400);
	}
	if (!criadoEm) {
		throw new ApiError(`Campo 'criadoEm' ausente na requisição.`, 400);
	}
	if (!atualizadoEm) {
		throw new ApiError(`Campo 'atualizadoEm' ausente na requisição.`, 400);
	}
}
