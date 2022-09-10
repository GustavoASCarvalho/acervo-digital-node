import { UsuarioRepositorio } from '../../src/app/repositories/UsuarioRepositorio';
import { Usuario } from '../../src/domain/entities/usuario';
import { ApiError } from '../../src/helpers/types/api-error';
import { usuarios } from '../usuario-memory';

export class InMemoryUsuarioRepositorio implements UsuarioRepositorio {
	public itens: Usuario[] = usuarios;
	async findById(id: string): Promise<Usuario | null> {
		return this.itens.find(item => item.id === id) ?? null;
	}
	async create(data: Usuario): Promise<Usuario> {
		this.itens.push(data);
		return data;
	}
	async delete(id: string, deletadoEm: Date): Promise<Usuario> {
		if (!(await this.findById(id))) {
			throw new ApiError(`Imagem ${id} não existe.`, 400);
		}
		const index = this.itens.findIndex(item => item.id === id);
		this.itens[index].deletadoEm = deletadoEm;
		return this.itens[index];
	}
}
