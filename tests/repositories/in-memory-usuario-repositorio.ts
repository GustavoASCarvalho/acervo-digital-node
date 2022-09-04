import { UsuarioRepositorio } from '../../src/app/repositories/UsuarioRepositorio';
import { TipoDeCargo, Usuario } from '../../src/domain/entities/usuario';

export class InMemoryUsuarioRepositorio implements UsuarioRepositorio {
	public itens: Usuario[] = [];
	async findById(id: string): Promise<Usuario | null> {
		return this.itens.find(item => item.id === id) ?? null;
	}
	async create(data: Usuario): Promise<Usuario> {
		const item = Usuario.criar(
			{
				nome: data.props.nome,
				email: data.props.email,
				senha: data.props.senha,
				imagemDePerfil: data.props.imagemDePerfil,
				cargo: data.props.cargo as TipoDeCargo,
			},
			data.criadoEm,
			data.atualizadoEm,
			data.id,
			data.deletadoEm ?? undefined,
		);
		this.itens.push(item);
		return item;
	}
}
