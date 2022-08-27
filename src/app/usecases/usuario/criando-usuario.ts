import { CargosDoUsuarioEnum, Usuario } from '../../../domain/entities/usuario';

export type CriandoUsuarioRequisicao = {
	nome: string;
	email: string;
	senha: string;
	imagemDePerfil: string;
};

export class CriandoUsuario {
	constructor() {}

	async executar({
		nome,
		email,
		senha,
		imagemDePerfil,
	}: CriandoUsuarioRequisicao) {
		const usuario = Usuario.criar({
			nome,
			cargo: CargosDoUsuarioEnum.USUARIO,
			email,
			imagemDePerfil,
			senha,
		});

		return usuario;
	}
}
