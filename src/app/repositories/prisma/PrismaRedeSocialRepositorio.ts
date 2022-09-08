import { prisma } from '../../../prisma';
import { RedeSocialRepositorio } from '../RedeSocialRepositorio';
import { ApiError } from '../../../helpers/types/api-error';
import { redes_sociais } from '@prisma/client';
import { RedeSocial } from '../../../domain/entities/redeSocial';

export class PrismaRedeSocialRepositorio implements RedeSocialRepositorio {
	async findById(id: string): Promise<RedeSocial | null> {
		const redesocial = await prisma.redes_sociais.findFirst({
			where: { id: id },
		});

		if (!redesocial) return null;

		return this.formatarRedeSocial(redesocial);
	}
	async create(data: RedeSocial): Promise<RedeSocial> {
		if (await this.findById(data.id)) {
			throw new ApiError(`RedeSocial ${data.id} já existe.`, 400);
		}

		const redesocial = await prisma.redes_sociais.create({
			data: {
				atualizado_em: data.atualizadoEm,
				criado_em: data.criadoEm,
				id: data.id,
				nome: data.props.nome,
				url: data.props.url,
			},
		});

		return this.formatarRedeSocial(redesocial);
	}
	async delete(id: string, deletadoEm: Date): Promise<RedeSocial> {
		if (!(await this.findById(id))) {
			throw new ApiError(`RedeSocial ${id} não existe.`, 400);
		}

		const redesocial = await prisma.redes_sociais.delete({
			where: { id },
		});

		return this.formatarRedeSocial(redesocial);
	}

	private formatarRedeSocial(redesocial: redes_sociais): RedeSocial {
		return RedeSocial.criar(
			{
				nome: redesocial.nome,
				url: redesocial.url,
			},
			redesocial.criado_em,
			redesocial.atualizado_em,
			redesocial.id,
		);
	}
}
