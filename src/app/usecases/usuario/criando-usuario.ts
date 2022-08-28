import { CargosDoUsuarioEnum, Usuario } from '../../../domain/entities/usuario';
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
