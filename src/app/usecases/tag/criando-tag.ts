import { Tag } from '../../../domain/entities/tag';
import { ApiError } from '../../../helpers/types/api-error';
import { TagRepositorio } from '../../repositories/TagRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type CriandoTagRequisicao = {
	nome: string;
	idDoUsuario: string;
	criadoEm: Date;
	atualizadoEm: Date;
};

export class CriandoTag {
	constructor(
		private usuarioRepositorio: UsuarioRepositorio,
		private tagRepositorio: TagRepositorio,
	) {}

	async executar({
		nome,
		idDoUsuario,
		criadoEm,
		atualizadoEm,
	}: CriandoTagRequisicao) {
		await validacaoDaRequisicao(
			{ nome, idDoUsuario, criadoEm, atualizadoEm },
			this.usuarioRepositorio,
		);

		const tag = Tag.criar(
			{
				idDoUsuario,
				nome,
			},
			criadoEm,
			atualizadoEm,
		);

		await this.tagRepositorio.create(tag);

		return tag;
	}
}

async function validacaoDaRequisicao(
	{ nome, idDoUsuario, criadoEm, atualizadoEm }: CriandoTagRequisicao,
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
	if (!criadoEm) {
		throw new ApiError(`Campo 'criadoEm' ausente na requisição.`, 400);
	}
	if (!atualizadoEm) {
		throw new ApiError(`Campo 'atualizadoEm' ausente na requisição.`, 400);
	}
}
