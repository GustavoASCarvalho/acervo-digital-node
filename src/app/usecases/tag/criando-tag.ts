import { Tag } from '../../../domain/entities/tag';
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
		const usuario = await this.usuarioRepositorio.findById(idDoUsuario);

		if (!usuario) {
			throw new Error('Usuario não encontrado.');
		}

		const tag = Tag.criar({
			idDoUsuario,
			nome,
		});

		await this.tagRepositorio.create(tag);

		return tag;
	}
}
