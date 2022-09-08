import { Comentario } from '../../../domain/entities/comentario';
import { ApiError } from '../../../helpers/types/api-error';
import { ComentarioRepositorio } from '../../repositories/ComentarioRepositorio';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';
import { PostagemRepositorio } from '../../repositories/PostagemRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type CriandoComentarioRequisicao = {
	titulo: string;
	texto: string;
	idDoUsuario: string;
	idDaPostagem?: string;
	idDaImagem?: string;
	criadoEm: Date;
	atualizadoEm: Date;
};

export class CriandoComentario {
	constructor(
		private usuarioRepositorio: UsuarioRepositorio,
		private postagemRepositorio: PostagemRepositorio,
		private imagemRepositorio: ImagemRepositorio,
		private comentarioRepositorio: ComentarioRepositorio,
	) {}

	async executar({
		titulo,
		texto,
		idDoUsuario,
		idDaPostagem,
		idDaImagem,
		criadoEm,
		atualizadoEm,
	}: CriandoComentarioRequisicao) {
		await validacaoDaRequisicao(
			{
				titulo,
				texto,
				idDoUsuario,
				idDaPostagem,
				idDaImagem,
				criadoEm,
				atualizadoEm,
			},
			this.usuarioRepositorio,
			this.postagemRepositorio,
			this.imagemRepositorio,
		);

		const comentario = Comentario.criar(
			{
				titulo,
				texto,
				idDoUsuario,
				idDaPostagem,
				idDaImagem,
			},
			criadoEm,
			atualizadoEm,
		);

		await this.comentarioRepositorio.create(comentario);

		return comentario;
	}
}

async function validacaoDaRequisicao(
	{
		titulo,
		texto,
		idDoUsuario,
		idDaPostagem,
		idDaImagem,
		criadoEm,
		atualizadoEm,
	}: CriandoComentarioRequisicao,
	usuarioRepositorio: UsuarioRepositorio,
	postagemRepositorio: PostagemRepositorio,
	imagemRepositorio: ImagemRepositorio,
) {
	if (!titulo) {
		throw new ApiError(`Campo 'titulo' ausente na requisição.`, 400);
	} else if (titulo.length >= 255) {
		throw new ApiError(`Campo 'titulo' invalido.`, 400);
	}
	if (!texto) {
		throw new ApiError(`Campo 'texto' ausente na requisição.`, 400);
	}
	if (!idDoUsuario) {
		throw new ApiError(`Campo 'idDoUsuario' ausente na requisição.`, 400);
	}
	if (!idDaPostagem && !idDaImagem) {
		throw new ApiError(
			`Campo 'idDaPostagem' ou 'idDaImagem' ausente na requisição.`,
			400,
		);
	}
	if (idDaPostagem && idDaImagem) {
		throw new ApiError(
			`Só é permitido comentario em uma imagem ou em uma postagem.`,
			400,
		);
	}
	const usuario = await usuarioRepositorio.findById(idDoUsuario);
	if (!usuario) {
		throw new ApiError(`Usuario '${idDoUsuario}' não encontrado.`, 404);
	}
	if (idDaPostagem) {
		const postagem = await postagemRepositorio.findById(idDaPostagem);

		if (!postagem) {
			throw new ApiError(`Postagem '${idDaPostagem}' não encontrado.`, 404);
		}
	} else if (idDaImagem) {
		const imagem = await imagemRepositorio.findById(idDaImagem);
		if (!imagem) {
			throw new ApiError(`Imagem '${idDaImagem}' não encontrado.`, 404);
		}
	}
	if (!criadoEm) {
		throw new ApiError(`Campo 'criadoEm' ausente na requisição.`, 400);
	}
	if (!atualizadoEm) {
		throw new ApiError(`Campo 'atualizadoEm' ausente na requisição.`, 400);
	}
}
