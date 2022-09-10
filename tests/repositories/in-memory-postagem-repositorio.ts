import { PostagemRepositorio } from '../../src/app/repositories/PostagemRepositorio';
import { Postagem } from '../../src/domain/entities/postagem';
import { ApiError } from '../../src/helpers/types/api-error';
import { postagens } from '../postagem-memory';

export class InMemoryPostagemRepositorio implements PostagemRepositorio {
	public itens: Postagem[] = postagens;
	async findById(id: string): Promise<Postagem | null> {
		return this.itens.find(item => item.id === id) ?? null;
	}
	async create(data: Postagem): Promise<Postagem> {
		this.itens.push(data);
		return data;
	}
	async delete(id: string, deletadoEm: Date): Promise<Postagem> {
		if (!(await this.findById(id))) {
			throw new ApiError(`Postagem ${id} não existe.`, 400);
		}
		const index = this.itens.findIndex(item => item.id === id);
		this.itens[index].deletadoEm = deletadoEm;
		return this.itens[index];
	}
}
