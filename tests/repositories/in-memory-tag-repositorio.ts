import { TagRepositorio } from '../../src/app/repositories/TagRepositorio';
import { Tag } from '../../src/domain/entities/tag';
import { ApiError } from '../../src/helpers/types/api-error';

export class InMemoryTagRepositorio implements TagRepositorio {
	public itens: Tag[] = [];
	async findById(id: string): Promise<Tag | null> {
		return this.itens.find(item => item.id === id) ?? null;
	}
	async create(data: Tag): Promise<Tag> {
		const item = Tag.criar(
			{
				idDoUsuario: data.props.idDoUsuario,
				nome: data.props.nome,
			},
			data.criadoEm,
			data.atualizadoEm,
			data.id,
			data.deletadoEm ?? undefined,
		);
		this.itens.push(item);
		return item;
	}
	async delete(id: string, deletadoEm: Date): Promise<void> {
		if (!(await this.findById(id))) {
			throw new ApiError(`Tag ${id} não existe.`, 400);
		}
		this.itens = this.itens.filter(item => item.id !== id);
	}
}
