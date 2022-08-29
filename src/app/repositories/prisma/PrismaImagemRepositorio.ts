import { prisma } from '../../../prisma';
import { Imagem } from '../../../domain/entities/imagem';
import { ImagemRepositorio } from '../ImagemRepositorio';
import { ApiError } from '../../../helpers/types/api-error';

export class PrismaImagemRepositorio implements ImagemRepositorio {
	async findById(id: string): Promise<Imagem | null> {
		const imagem = await prisma.imagem.findFirst({
			where: { id: id },
		});

		if (!imagem) return null;

		return Imagem.criar(
			{
				url: imagem.url,
				nome: imagem.nome,
				data: imagem.data,
				visualizacoes: imagem.visualizacoes,
				endereco: imagem.endereco,
				latitude: imagem.latitude,
				longitude: imagem.longitude,
				idDoUsuario: imagem.idDoUsuario,
			},
			id,
			imagem.criadoEm,
			imagem.atualizadoEm,
			imagem.deletadoEm ?? undefined,
		);
	}
	async create(data: Imagem): Promise<Imagem> {
		if (await this.findById(data.id)) {
			throw new ApiError(`Imagem ${data.id} já existe.`, 400);
		}

		const imagem = await prisma.imagem.create({
			data: {
				atualizadoEm: data.atualizadoEm,
				id: data.id,
				criadoEm: data.criadoEm,
				deletadoEm: data.deletadoEm,
				data: data.props.data,
				visualizacoes: data.props.visualizacoes,
				endereco: data.props.endereco,
				idDoUsuario: data.props.idDoUsuario,
				latitude: data.props.latitude,
				longitude: data.props.longitude,
				nome: data.props.nome,
				url: data.props.url,
			},
		});

		return Imagem.criar(
			{
				data: imagem.data,
				endereco: imagem.endereco,
				idDoUsuario: imagem.idDoUsuario,
				latitude: imagem.latitude,
				longitude: imagem.longitude,
				nome: imagem.nome,
				url: imagem.url,
				visualizacoes: imagem.visualizacoes,
			},
			imagem.id,
			imagem.criadoEm,
			imagem.atualizadoEm,
			imagem.deletadoEm ?? undefined,
		);
	}
}
