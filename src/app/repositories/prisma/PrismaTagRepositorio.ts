import { prisma } from '../../../prisma';
import { Tag } from '../../../domain/entities/tag';
import { TagRepositorio } from '../TagRepositorio';
import { ApiError } from '../../../helpers/types/api-error';
import { tags } from '@prisma/client';

export class PrismaTagRepositorio implements TagRepositorio {
	async findById(id: string): Promise<Tag | null> {
		const tag = await prisma.tags.findFirst({
			where: { id: id },
		});

		if (!tag) return null;

		return this.formatarTag(tag);
	}
	async create(data: Tag): Promise<Tag> {
		if (await this.findById(data.id)) {
			throw new ApiError(`Tag ${data.id} já existe.`, 400);
		}
		const tag = await prisma.tags.create({
			data: {
				id_do_usuario: data.props.idDoUsuario,
				nome: data.props.nome,
				id: data.id,
				criado_em: data.criadoEm,
				atualizado_em: data.atualizadoEm,
				deletado_em: data.deletadoEm ?? undefined,
			},
		});

		return this.formatarTag(tag);
	}

	private formatarTag(tag: tags): Tag {
		return Tag.criar(
			{
				idDoUsuario: tag.id_do_usuario,
				nome: tag.nome,
			},
			tag.id,
			tag.criado_em,
			tag.atualizado_em,
			tag.deletado_em ?? undefined,
		);
	}
}
