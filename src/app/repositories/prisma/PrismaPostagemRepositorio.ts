import { prisma } from '../../../prisma';
import { Postagem } from '../../../domain/entities/postagem';
import { PostagemRepositorio } from '../PostagemRepositorio';

export class PrismaPostagemRepositorio implements PostagemRepositorio {
	async findById(id: string): Promise<Postagem | null> {
		const postagem = await prisma.postagem.findFirst({
			where: { id: id },
		});

		if (!postagem) return null;

		return Postagem.criar(
			{
				descricao: postagem.descricao,
				idDoUsuario: postagem.idDoUsuario,
				texto: postagem.texto,
				titulo: postagem.titulo,
				visualizacoes: postagem.visualizacoes,
			},
			id,
			postagem.criadoEm,
			postagem.atualizadoEm,
			postagem.deletadoEm ?? undefined,
		);
	}
	async create(data: Postagem): Promise<Postagem> {
		const postagem = await prisma.postagem.create({
			data: {
				descricao: data.props.descricao,
				idDoUsuario: data.props.idDoUsuario,
				texto: data.props.texto,
				titulo: data.props.titulo,
				visualizacoes: data.props.visualizacoes,
				id: data.id,
				criadoEm: data.criadoEm,
				atualizadoEm: data.atualizadoEm,
				deletadoEm: data.deletadoEm ?? undefined,
			},
		});

		return Postagem.criar(
			{
				descricao: postagem.descricao,
				idDoUsuario: postagem.idDoUsuario,
				texto: postagem.texto,
				titulo: postagem.titulo,
				visualizacoes: postagem.visualizacoes,
			},
			postagem.id,
			postagem.criadoEm,
			postagem.atualizadoEm,
			postagem.deletadoEm ?? undefined,
		);
	}
}
