import { prisma } from '../../../prisma';
import { ApiError } from '../../../helpers/types/api-error';
import { comentarios } from '@prisma/client';
import { ComentarioRepositorio } from '../ComentarioRepositorio';
import { Comentario } from '../../../domain/entities/comentario';

export class PrismaComentarioRepositorio implements ComentarioRepositorio {
	async findById(id: string): Promise<Comentario | null> {
		const comentario = await prisma.comentarios.findFirst({
			where: { id: id },
		});

		if (!comentario) return null;

		return this.formatarComentario(comentario);
	}
	async create(data: Comentario): Promise<Comentario> {
		if (await this.findById(data.id)) {
			throw new ApiError(`Comentario ${data.id} já existe.`, 400);
		}

		const comentario = await prisma.comentarios.create({
			data: {
				atualizado_em: data.atualizadoEm,
				criado_em: data.criadoEm,
				id: data.id,
				texto: data.props.texto,
				titulo: data.props.titulo,
				id_do_usuario: data.props.idDoUsuario,
				id_da_imagem: data.props.idDaImagem,
				id_da_postagem: data.props.idDaPostagem,
			},
		});

		return this.formatarComentario(comentario);
	}

	private formatarComentario(comentario: comentarios): Comentario {
		return Comentario.criar(
			{
				titulo: comentario.titulo,
				texto: comentario.texto,
				idDoUsuario: comentario.id_do_usuario,
				idDaPostagem: comentario.id_da_postagem ?? undefined,
				idDaImagem: comentario.id_da_imagem ?? undefined,
			},
			comentario.criado_em,
			comentario.atualizado_em,
			comentario.id,
			comentario.deletado_em ?? undefined,
		);
	}
}
