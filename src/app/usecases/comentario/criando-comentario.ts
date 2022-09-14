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
	const campos = { titulo, texto, idDoUsuario, criadoEm, atualizadoEm };

	for (const [key, value] of Object.entries(campos)) {
		if (value == null || value === undefined) {
			throw new ApiError(`Campo '${key}' ausente na requisição.`, 400);
		}
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

	const postagem = await postagemRepositorio.findById(idDaPostagem!);
	if (!postagem && idDaPostagem) {
		throw new ApiError(`Postagem '${idDaPostagem}' não encontrada.`, 404);
	}

	const imagem = await imagemRepositorio.findById(idDaImagem!);
	if (!imagem && idDaImagem) {
		throw new ApiError(`Imagem '${idDaImagem}' não encontrada.`, 404);
	}
}
