import { TagRepositorio } from '../../src/app/repositories/TagRepositorio';
import { Tag } from '../../src/domain/entities/tag';

export class InMemoryTagRepositorio implements TagRepositorio {
	public items: Tag[] = [];
	async findById(id: string): Promise<Tag | null> {
		return this.items.find(item => item.id === id) ?? null;
	}
	async create(data: Tag): Promise<Tag> {
		const item = Tag.criar(
			{
				idDoUsuario: data.props.idDoUsuario,
				nome: data.props.nome,
			},
			data.id,
			data.criadoEm,
			data.atualizadoEm,
			data.deletadoEm ?? undefined,
		);
		this.items.push(item);
		return item;
	}
}
