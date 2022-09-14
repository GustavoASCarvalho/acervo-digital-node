import { ImagemRepositorio } from '../../src/app/repositories/ImagemRepositorio';
import { AtualizandoImagemRequisicao } from '../../src/app/usecases/imagem/atualizando-imagem';
import { Imagem } from '../../src/domain/entities/imagem';
import { Tag } from '../../src/domain/entities/tag';
import { TagEmImagensPostagens } from '../../src/domain/entities/tagsEmImagensPostagens';
import { ApiError } from '../../src/helpers/types/api-error';
import { imagens } from '../imagem-memory';
import { tags_em_imagens_postagens } from '../tags-em-imagens-postagens-memory';
import { tags } from '../tag-memory';

export class InMemoryImagemRepositorio implements ImagemRepositorio {
	public itens: Imagem[] = imagens;
	public tagsEmImagensPostagens: TagEmImagensPostagens[] =
		tags_em_imagens_postagens;
	public tags: Tag[] = tags;

	async findById(id: string): Promise<Imagem | null> {
		return this.itens.find(item => item.id === id) ?? null;
	}

	async create(data: Imagem): Promise<Imagem> {
		if (await this.findById(data.id)) {
			throw new ApiError(`Imagem ${data.id} já existe.`, 400);
		}
		this.itens.push(data);
		return data;
	}

	async delete(id: string, deletadoEm: Date): Promise<Imagem> {
		if (!(await this.findById(id))) {
			throw new ApiError(`Imagem ${id} não existe.`, 400);
		}
		const index = this.itens.findIndex(item => item.id === id);
		this.itens[index].deletadoEm = deletadoEm;
		return this.itens[index];
	}

	async read(): Promise<Imagem[]> {
		return this.itens;
	}

	async search(query: string): Promise<Imagem[]> {
		let tags: Tag[] = this.tags.filter(item => item.props.nome.includes(query));
		let imgs: Imagem[] = [];
		query = query.split(' ').join('').toLowerCase();
		this.itens.forEach(item => {
			this.tagsEmImagensPostagens.forEach(tagsEmImagem => {
				tags.forEach(tag => {
					if (
						tagsEmImagem.props.idDaImagem === item.id &&
						tagsEmImagem.props.idDaTag === tag.id
					) {
						imgs.push(item);
					}
				});
			});
		});
		this.itens.forEach(item => {
			if (item.props.nome.includes(query)) imgs.push(item);
		});

		imgs = imgs.filter((este, i) => imgs.indexOf(este) === i);

		return imgs;
	}

	async update(data: AtualizandoImagemRequisicao): Promise<Imagem> {
		let i = -1;

		this.itens.forEach((item, index) => {
			if (item.id === data.id) {
				item.props.nome = data.nome;
				item.props.data = data.data;
				item.props.endereco = data.endereco;
				item.props.latitude = data.latitude;
				item.props.longitude = data.longitude;
				item.atualizadoEm = data.atualizadoEm;
				item.props.eSugestao = data.eSugestao;

				i = index;
			}
		});

		if (i >= 0) {
			return this.itens[i];
		} else {
			throw new ApiError(`Imagem '${data.id}' não existe.`, 400);
		}
	}
}
