import { ComentarioRepositorio } from '../../src/app/repositories/ComentarioRepositorio';
import { Comentario } from '../../src/domain/entities/comentario';
import { ApiError } from '../../src/helpers/types/api-error';
import { comentarios } from '../comentario-memory';

export class InMemoryComentarioRepositorio implements ComentarioRepositorio {
	public itens: Comentario[] = comentarios;

	async findById(id: string): Promise<Comentario | null> {
		return this.itens.find(item => item.id === id) ?? null;
	}

	async create(data: Comentario): Promise<Comentario> {
		if (await this.findById(data.id)) {
			throw new ApiError(`Comentario ${data.id} já existe.`, 400);
		}
		this.itens.push(data);
		return data;
	}

	async delete(id: string, deletadoEm: Date): Promise<Comentario> {
		if (!(await this.findById(id))) {
			throw new ApiError(`Comentario ${id} não existe.`, 400);
		}
		const index = this.itens.findIndex(item => item.id === id);
		this.itens[index].deletadoEm = deletadoEm;
		return this.itens[index];
	}
}
