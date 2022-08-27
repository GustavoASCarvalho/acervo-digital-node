import { Postagem } from '../../../domain/entities/postagem';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type CriandoPostagemRequisicao = {
	titulo: string;
	descricao: string;
	texto: string;
	idDoUsuario: string;
};

export class CriandoPostagem {
	constructor(private usuarioRepositorio: UsuarioRepositorio) {}

	async executar({
		titulo,
		descricao,
		texto,
		idDoUsuario,
	}: CriandoPostagemRequisicao) {
		const usuario = await this.usuarioRepositorio.findById(idDoUsuario);

		if (!usuario) {
			throw new Error('Usuario não encontrado.');
		}

		const postagem = Postagem.criar({
			descricao,
			idDoUsuario,
			texto,
			titulo,
			visualizacoes: 0,
		});

		return postagem;
	}
}
