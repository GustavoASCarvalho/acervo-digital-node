import { prisma } from '../../../prisma';
import { Tag } from '../../../domain/entities/tag';
import { TagRepositorio } from '../TagRepositorio';

export class PrismaTagRepositorio implements TagRepositorio {
	async findById(id: string): Promise<Tag | null> {
		const tag = await prisma.tag.findFirst({
			where: { id: id },
		});

		if (!tag) return null;

		return Tag.criar(
			{
				idDoUsuario: tag.idDoUsuario,
				nome: tag.nome,
			},
			id,
			tag.criadoEm,
			tag.atualizadoEm,
			tag.deletadoEm ?? undefined,
		);
	}
	async create(data: Tag): Promise<Tag> {
		const tag = await prisma.tag.create({
			data: {
				idDoUsuario: data.props.idDoUsuario,
				nome: data.props.nome,
				id: data.id,
				criadoEm: data.criadoEm,
				atualizadoEm: data.atualizadoEm,
				deletadoEm: data.deletadoEm ?? undefined,
			},
		});

		return Tag.criar(
			{
				idDoUsuario: tag.idDoUsuario,
				nome: tag.nome,
			},
			tag.id,
			tag.criadoEm,
			tag.atualizadoEm,
			tag.deletadoEm ?? undefined,
		);
	}
}
