import { ImagemRepositorio } from '../../src/app/repositories/ImagemRepositorio';
import { Imagem } from '../../src/domain/entities/imagem';

export class InMemoryImagemRepositorio implements ImagemRepositorio {
	public items: Imagem[] = [];
	async findById(id: string): Promise<Imagem | null> {
		return this.items.find(item => item.id === id) ?? null;
	}
	async create(data: Imagem): Promise<Imagem> {
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
			data.id,
			data.criadoEm,
			data.atualizadoEm,
			data.deletadoEm ?? undefined,
		);
		this.items.push(item);
		return item;
	}
}
