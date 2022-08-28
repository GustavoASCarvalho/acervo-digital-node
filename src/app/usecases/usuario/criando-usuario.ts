import { CargosDoUsuarioEnum, Usuario } from '../../../domain/entities/usuario';
import { ApiError } from '../../../helpers/api-error';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type CriandoUsuarioRequisicao = {
	nome: string;
	email: string;
	senha: string;
	imagemDePerfil: string;
};

export class CriandoUsuario {
	constructor(private usuarioRepositorio: UsuarioRepositorio) {}

	async executar({
		nome,
		email,
		senha,
		imagemDePerfil,
	}: CriandoUsuarioRequisicao) {
		await validacaoDaRequisicao({ nome, email, senha, imagemDePerfil });
		const usuario = Usuario.criar({
			nome,
			cargo: CargosDoUsuarioEnum.USUARIO,
			email,
			imagemDePerfil,
			senha,
		});

		await this.usuarioRepositorio.create(usuario);

		return usuario;
	}
}

async function validacaoDaRequisicao({
	nome,
	email,
	senha,
	imagemDePerfil,
}: CriandoUsuarioRequisicao) {
	let mensagensDeErro: string[] = [];

	if (!nome) {
		mensagensDeErro.push(`O campo 'nome' não está presente na requisição.`);
	}
	if (!email) {
		mensagensDeErro.push(`O campo 'email' não está presente na requisição.`);
	}
	if (!senha) {
		mensagensDeErro.push(`O campo 'senha' não está presente na requisição.`);
	}
	if (!imagemDePerfil) {
		mensagensDeErro.push(
			`O campo 'imagemDePerfil' não está presente na requisição.`,
		);
	}
	if (mensagensDeErro.length > 0) {
		throw new ApiError(mensagensDeErro, 400);
	}
}
