import { prisma } from '../../../prisma';
import { Imagem } from '../../../domain/entities/imagem';
import { ImagemRepositorio } from '../ImagemRepositorio';
import { ApiError } from '../../../helpers/types/api-error';
import { imagens } from '@prisma/client';
import { AtualizandoImagemRequisicao } from '../../usecases/imagem/atualizando-imagem';

export class PrismaImagemRepositorio implements ImagemRepositorio {
	async findById(id: string): Promise<Imagem | null> {
		const imagem = await prisma.imagens.findFirst({
			where: { id: id },
		});

		if (!imagem) return null;

		return this.formatarImagem(imagem);
	}
	async create(data: Imagem): Promise<Imagem> {
		if (await this.findById(data.id)) {
			throw new ApiError(`Imagem ${data.id} já existe.`, 400);
		}

		const imagem = await prisma.imagens.create({
			data: {
				atualizado_em: data.atualizadoEm,
				id: data.id,
				criado_em: data.criadoEm,
				deletado_em: data.deletadoEm,
				data: data.props.data,
				visualizacoes: data.props.visualizacoes,
				endereco: data.props.endereco,
				id_do_usuario: data.props.idDoUsuario,
				latitude: data.props.latitude,
				longitude: data.props.longitude,
				nome: data.props.nome,
				url: data.props.url,
				e_sugestao: data.props.eSugestao,
			},
		});

		return this.formatarImagem(imagem);
	}
	async delete(id: string, deletadoEm: Date): Promise<Imagem> {
		if (!(await this.findById(id))) {
			throw new ApiError(`Imagem ${id} não existe.`, 400);
		}

		const imagem = await prisma.imagens.update({
			where: { id },
			data: { deletado_em: deletadoEm },
		});

		return this.formatarImagem(imagem);
	}
	async update(data: AtualizandoImagemRequisicao): Promise<Imagem> {
		if (!(await this.findById(data.id))) {
			throw new ApiError(`Imagem ${data.id} não existe.`, 400);
		}

		const imagem = await prisma.imagens.update({
			where: { id: data.id },
			data: {
				atualizado_em: data.atualizadoEm,
				data: data.data,
				criado_em: data.criadoEm,
				e_sugestao: data.eSugestao,
				endereco: data.endereco,
				latitude: data.latitude,
				longitude: data.longitude,
				nome: data.nome,
			},
		});

		return this.formatarImagem(imagem);
	}

	async read(): Promise<Imagem[]> {
		let imagens: Imagem[] = [];
		const imagem = await prisma.imagens.findMany();
		imagem.forEach(imagem => imagens.push(this.formatarImagem(imagem)));
		return imagens;
	}

	async search(query: string): Promise<Imagem[]> {
		let imagens: Imagem[] = [];
		const imagem = await prisma.imagens.findMany({
			where: {
				OR: [
					{
						nome: {
							contains: query,
							mode: 'insensitive',
						},
					},
					{
						tag_em_imagens_postagens: {
							some: {
								tag: {
									nome: {
										contains: query,
										mode: 'insensitive',
									},
								},
							},
						},
					},
				],
			},
		});
		imagem.forEach(imagem => imagens.push(this.formatarImagem(imagem)));
		return imagens;
	}

	private formatarImagem(imagem: imagens): Imagem {
		return Imagem.criar(
			{
				url: imagem.url,
				nome: imagem.nome,
				data: imagem.data,
				visualizacoes: imagem.visualizacoes,
				endereco: imagem.endereco,
				latitude: imagem.latitude,
				longitude: imagem.longitude,
				idDoUsuario: imagem.id_do_usuario,
				eSugestao: imagem.e_sugestao,
			},
			imagem.criado_em,
			imagem.atualizado_em,
			imagem.id,
			imagem.deletado_em ?? undefined,
		);
	}
}
