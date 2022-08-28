import { UsuarioRepositorio } from '../../src/app/repositories/UsuarioRepositorio';
import {
	CargosDoUsuarioEnum,
	Usuario,
} from '../../src/domain/entities/usuario';

export class InMemoryUsuarioRepositorio implements UsuarioRepositorio {
	public items: Usuario[] = [];
	async findById(id: string): Promise<Usuario | null> {
		return this.items.find(item => item.id === id) ?? null;
	}
	async create(data: Usuario): Promise<Usuario> {
		const item = Usuario.criar(
			{
				nome: data.props.nome,
				email: data.props.email,
				senha: data.props.senha,
				imagemDePerfil: data.props.imagemDePerfil,
				cargo: data.props.cargo as CargosDoUsuarioEnum,
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
