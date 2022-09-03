import { Postagem } from '../../../domain/entities/postagem';
import { ApiError } from '../../../helpers/types/api-error';
import { PostagemRepositorio } from '../../repositories/PostagemRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type CriandoPostagemRequisicao = {
	titulo: string;
	descricao: string;
	texto: string;
	idDoUsuario: string;
	criadoEm: Date;
	atualizadoEm: Date;
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
		criadoEm,
		atualizadoEm,
	}: CriandoPostagemRequisicao) {
		await validacaoDaRequisicao(
			{ titulo, descricao, texto, idDoUsuario, criadoEm, atualizadoEm },
			this.usuarioRepositorio,
		);

		const postagem = Postagem.criar(
			{
				descricao,
				idDoUsuario,
				texto,
				titulo,
				visualizacoes: 0,
			},
			criadoEm,
			atualizadoEm,
		);

		this.postagemRepositorio.create(postagem);

		return postagem;
	}
}

async function validacaoDaRequisicao(
	{
		titulo,
		descricao,
		texto,
		idDoUsuario,
		criadoEm,
		atualizadoEm,
	}: CriandoPostagemRequisicao,
	usuarioRepositorio: UsuarioRepositorio,
) {
	if (!titulo) {
		throw new ApiError(`Campo 'titulo' na requisição.`, 400);
	}

	if (!descricao) {
		throw new ApiError(`Campo 'descricao' na requisição.`, 400);
	}

	if (!texto) {
		throw new ApiError(`Campo 'texto' na requisição.`, 400);
	}
	if (!idDoUsuario) {
		throw new ApiError(`Campo 'idDoUsuario' na requisição.`, 400);
	}
	const usuario = await usuarioRepositorio.findById(idDoUsuario);
	if (!usuario) {
		throw new ApiError(`Usuario '${idDoUsuario}' não encontrado.`, 404);
	}
	if (!criadoEm) {
		throw new ApiError(`Campo 'criadoEm' ausente na requisição.`, 400);
	}
	if (!atualizadoEm) {
		throw new ApiError(`Campo 'atualizadoEm' ausente na requisição.`, 400);
	}
}
