import { RedeSocialRepositorio } from '../../src/app/repositories/RedeSocialRepositorio';
import { RedeSocial } from '../../src/domain/entities/redeSocial';
import { ApiError } from '../../src/helpers/types/api-error';
import { redesSociais } from '../rede-social-memory';

export class InMemoryRedeSocialRepositorio implements RedeSocialRepositorio {
	public itens: RedeSocial[] = redesSociais;

	async findById(id: string): Promise<RedeSocial | null> {
		return this.itens.find(item => item.id === id) ?? null;
	}

	async create(data: RedeSocial): Promise<RedeSocial> {
		if (await this.findById(data.id)) {
			throw new ApiError(`Rede Social ${data.id} já existe.`, 400);
		}
		this.itens.push(data);
		return data;
	}

	async delete(id: string, deletadoEm: Date): Promise<RedeSocial> {
		if (!(await this.findById(id))) {
			throw new ApiError(`Rede Social ${id} não existe.`, 400);
		}
		const index = this.itens.findIndex(item => item.id === id);
		this.itens[index].deletadoEm = deletadoEm;
		return this.itens[index];
	}
}
