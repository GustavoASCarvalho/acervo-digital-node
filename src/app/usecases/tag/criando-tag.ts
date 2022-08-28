import { Tag } from '../../../domain/entities/tag';
import { ApiError } from '../../../helpers/api-error';
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
	let mensagensDeErro: string[] = [];

	if (!nome) {
		mensagensDeErro.push(`O campo 'nome' não está presente na requisição.`);
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
