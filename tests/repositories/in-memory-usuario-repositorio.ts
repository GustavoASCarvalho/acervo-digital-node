import { UsuarioRepositorio } from '../../src/app/repositories/UsuarioRepositorio';
import { AtualizandoUsuarioRequisicao } from '../../src/app/usecases/usuario/atualizando-usuario';
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
	async update(
		data: Omit<AtualizandoUsuarioRequisicao, 'idDoUsuario'>,
	): Promise<Usuario> {
		let i = -1;

		this.itens.forEach((item, index) => {
			if (item.id === data.id) {
				item.atualizadoEm = data.atualizadoEm;
				item.criadoEm = data.criadoEm;
				item.props.cargo = data.cargo;
				item.props.email = data.email;
				item.props.imagemDePerfil = data.imagemDePerfil;
				item.props.nome = data.nome;
				item.props.senha = data.senha;
				i = index;
			}
		});

		if (i >= 0) {
			return this.itens[i];
		} else {
			throw new ApiError(`Usuario ${data.id} não existe.`, 400);
		}
	}
}
