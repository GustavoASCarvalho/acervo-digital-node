import { ImagemRepositorio } from '../../src/app/repositories/ImagemRepositorio';
import { Imagem } from '../../src/domain/entities/imagem';
import { ApiError } from '../../src/helpers/types/api-error';

export class InMemoryImagemRepositorio implements ImagemRepositorio {
	public itens: Imagem[] = [];
	async findById(id: string): Promise<Imagem | null> {
		return this.itens.find(item => item.id === id) ?? null;
	}
	async create(data: Imagem): Promise<Imagem> {
		if (await this.findById(data.id)) {
			throw new ApiError(`Imagem ${data.id} já existe.`, 400);
		}
		const item = Imagem.criar(
			{
				data: data.props.data,
				endereco: data.props.endereco,
				idDoUsuario: data.props.idDoUsuario,
				latitude: data.props.latitude,
				longitude: data.props.longitude,
				nome: data.props.nome,
				url: data.props.url,
				visualizacoes: data.props.visualizacoes,
			},
			data.criadoEm,
			data.atualizadoEm,
			data.id,
			data.deletadoEm ?? undefined,
		);
		this.itens.push(item);
		return item;
	}
	async delete(id: string, deletadoEm: Date): Promise<Imagem> {
		if (!(await this.findById(id))) {
			throw new ApiError(`Imagem ${id} não existe.`, 400);
		}
		const index = this.itens.findIndex(item => item.id === id);
		this.itens[index].deletadoEm = deletadoEm;
		return this.itens[index];
	}
}
