import { Request, Response } from 'express';
import { PrismaUsuarioRepositorio } from '../repositories/prisma/PrismaUsuarioRepositorio';
import { ApiResponse } from '../../helpers/types/api-response';
import {
	CriandoComentario,
	CriandoComentarioRequisicao,
} from '../usecases/comentario/criando-comentario';
import { PrismaPostagemRepositorio } from '../repositories/prisma/PrismaPostagemRepositorio';
import { PrismaImagemRepositorio } from '../repositories/prisma/PrismaImagemRepositorio';
import { PrismaComentarioRepositorio } from '../repositories/prisma/PrismaComentarioRepositorio';

export class ComentarioControlador {
	async create(req: Request, res: Response): Promise<Response> {
		const data: CriandoComentarioRequisicao = req.body;
		const usuarioRepositorio = new PrismaUsuarioRepositorio();
		const postagemRepositorio = new PrismaPostagemRepositorio();
		const imagemRepositorio = new PrismaImagemRepositorio();
		const comentarioRepositorio = new PrismaComentarioRepositorio();

		const criandoComentario = new CriandoComentario(
			usuarioRepositorio,
			postagemRepositorio,
			imagemRepositorio,
			comentarioRepositorio,
		);

		const comentario = await criandoComentario.executar(data);
		return res.status(201).json({
			message: `Comentario '${comentario.props.texto}' criado com sucesso`,
			statusCode: 201,
			data: {
				id: comentario.id,
			},
		} as ApiResponse);
	}
}
