import { Tag } from '../../../domain/entities/tag';
import { ApiError } from '../../../helpers/types/api-error';
import { TagRepositorio } from '../../repositories/TagRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type CriandoTagRequisicao = {
	nome: string;
	idDoUsuario: string;
};

export class CriandoTag {
	constructor(
		private usuarioRepositorio: UsuarioRepositorio,
		private tagRepositorio: TagRepositorio,
	) {}

	async executar({ nome, idDoUsuario }: CriandoTagRequisicao) {
		await validacaoDaRequisicao({ nome, idDoUsuario }, this.usuarioRepositorio);

		const tag = Tag.criar({
			idDoUsuario,
			nome,
		});

		await this.tagRepositorio.create(tag);

		return tag;
	}
}

async function validacaoDaRequisicao(
	{ nome, idDoUsuario }: CriandoTagRequisicao,
	usuarioRepositorio: UsuarioRepositorio,
) {
	if (!nome) {
		throw new ApiError(`Campo 'nome' na requisição.`, 400);
	}
	if (!idDoUsuario) {
		throw new ApiError(`Campo 'idDoUsuario' na requisição.`, 400);
	}
	const usuario = await usuarioRepositorio.findById(idDoUsuario);
	if (!usuario) {
		throw new ApiError(`Usuario '${idDoUsuario}' não encontrado.`, 404);
	}
}
