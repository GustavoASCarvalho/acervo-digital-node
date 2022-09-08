import { PostagemRepositorio } from '../../src/app/repositories/PostagemRepositorio';
import { Postagem } from '../../src/domain/entities/postagem';
import { ApiError } from '../../src/helpers/types/api-error';

export class InMemoryPostagemRepositorio implements PostagemRepositorio {
	public itens: Postagem[] = [];
	async findById(id: string): Promise<Postagem | null> {
		return this.itens.find(item => item.id === id) ?? null;
	}
	async create(data: Postagem): Promise<Postagem> {
		const item = Postagem.criar(
			{
				idDoUsuario: data.props.idDoUsuario,
				descricao: data.props.descricao,
				texto: data.props.texto,
				titulo: data.props.titulo,
				visualizacoes: data.props.visualizacoes,
				eSugestao: data.props.eSugestao,
			},
			data.criadoEm,
			data.atualizadoEm,
			data.id,
			data.deletadoEm ?? undefined,
		);
		this.itens.push(item);
		return item;
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
