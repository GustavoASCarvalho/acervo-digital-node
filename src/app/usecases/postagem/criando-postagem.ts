import { Postagem } from '../../../domain/entities/postagem';
import { ApiError } from '../../../helpers/api-error';
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
		await validacaoDaRequisicao(
			{ titulo, descricao, texto, idDoUsuario },
			this.usuarioRepositorio,
		);

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

async function validacaoDaRequisicao(
	{ titulo, descricao, texto, idDoUsuario }: CriandoPostagemRequisicao,
	usuarioRepositorio: UsuarioRepositorio,
) {
	let mensagensDeErro: string[] = [];

	if (!titulo) {
		mensagensDeErro.push(`O campo 'titulo' não está presente na requisição.`);
	}

	if (!descricao) {
		mensagensDeErro.push(
			`O campo 'descricao' não está presente na requisição.`,
		);
	}

	if (!texto) {
		mensagensDeErro.push(`O campo 'texto' não está presente na requisição.`);
	}

	if (!idDoUsuario) {
		mensagensDeErro.push(
			`O campo 'idDoUsuario' não está presente na requisição.`,
		);
	}
	if (mensagensDeErro.length > 0) {
		throw new ApiError(mensagensDeErro, 400);
	}

	const usuario = await usuarioRepositorio.findById(idDoUsuario);
	if (!usuario) {
		throw new ApiError([`Usuario '${idDoUsuario}' não encontrado.`], 404);
	}
}
