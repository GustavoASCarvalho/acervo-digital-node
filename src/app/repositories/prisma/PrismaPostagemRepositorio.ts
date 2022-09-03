import { prisma } from '../../../prisma';
import { Postagem } from '../../../domain/entities/postagem';
import { PostagemRepositorio } from '../PostagemRepositorio';
import { ApiError } from '../../../helpers/types/api-error';
import { postagens } from '@prisma/client';

export class PrismaPostagemRepositorio implements PostagemRepositorio {
	async findById(id: string): Promise<Postagem | null> {
		const postagem = await prisma.postagens.findFirst({
			where: { id: id },
		});

		if (!postagem) return null;

		return this.formatarPostagem(postagem);
	}
	async create(data: Postagem): Promise<Postagem> {
		if (await this.findById(data.id)) {
			throw new ApiError(`Postagem ${data.id} já existe.`, 400);
		}
		const postagem = await prisma.postagens.create({
			data: {
				descricao: data.props.descricao,
				id_do_usuario: data.props.idDoUsuario,
				texto: data.props.texto,
				titulo: data.props.titulo,
				visualizacoes: data.props.visualizacoes,
				id: data.id,
				criado_em: data.criadoEm,
				atualizado_em: data.atualizadoEm,
				deletado_em: data.deletadoEm ?? undefined,
			},
		});

		return this.formatarPostagem(postagem);
	}

	private formatarPostagem(postagem: postagens): Postagem {
		return Postagem.criar(
			{
				descricao: postagem.descricao,
				idDoUsuario: postagem.id_do_usuario,
				texto: postagem.texto,
				titulo: postagem.titulo,
				visualizacoes: postagem.visualizacoes,
			},
			postagem.id,
			postagem.criado_em,
			postagem.atualizado_em,
			postagem.deletado_em ?? undefined,
		);
	}
}
