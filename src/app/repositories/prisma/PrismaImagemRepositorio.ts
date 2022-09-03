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

		return Imagem.criar(imagem);
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

		return Imagem.criar(imagem);
	}
	async delete(id: string, deletadoEm: string): Promise<Imagem> {
		if (!(await this.findById(id))) {
			throw new ApiError(`Imagem ${id} não existe.`, 400);
		}

		const imagem = await prisma.imagem.update({
			where: { id },
			data: { deletadoEm },
		});

		return Imagem.criar(imagem);
	}
}
