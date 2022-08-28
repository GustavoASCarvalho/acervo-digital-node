import { PostagemRepositorio } from '../../src/app/repositories/PostagemRepositorio';
import { Postagem } from '../../src/domain/entities/postagem';

export class InMemoryPostagemRepositorio implements PostagemRepositorio {
	public items: Postagem[] = [];
	async findById(id: string): Promise<Postagem | null> {
		return this.items.find(item => item.id === id) ?? null;
	}
	async create(data: Postagem): Promise<Postagem> {
		const item = Postagem.criar(
			{
				idDoUsuario: data.props.idDoUsuario,
				descricao: data.props.descricao,
				texto: data.props.texto,
				titulo: data.props.titulo,
				visualizacoes: data.props.visualizacoes,
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
