import { Postagem } from '../../../domain/entities/postagem';
import { PostagemRepositorio } from '../../repositories/PostagemRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type CriandoPostagemRequisicao = {
	titulo: string;
	descricao: string;
	texto: string;
	idDoUsuario: string;
};

export class CriandoPostagem {
	constructor(
		private usuarioRepositorio: UsuarioRepositorio,
		private postagemRepositorio: PostagemRepositorio,
	) {}

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

		this.postagemRepositorio.create(postagem);

		return postagem;
	}
}
