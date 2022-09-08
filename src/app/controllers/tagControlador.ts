import { Request, Response } from 'express';
import { PrismaUsuarioRepositorio } from '../repositories/prisma/PrismaUsuarioRepositorio';
import { ApiResponse } from '../../helpers/types/api-response';
import { CriandoTag, CriandoTagRequisicao } from '../usecases/tag/criando-tag';
import { PrismaTagRepositorio } from '../repositories/prisma/PrismaTagRepositorio';

export class TagControlador {
	async create(req: Request, res: Response): Promise<Response> {
		const data: CriandoTagRequisicao = req.body;
		const usuarioRepositorio = new PrismaUsuarioRepositorio();
		const tagRepositorio = new PrismaTagRepositorio();
		const criandoTag = new CriandoTag(usuarioRepositorio, tagRepositorio);

		const tag = await criandoTag.executar(data);

		return res.status(201).json({
			message: `Tag '${data.nome}' criada com sucesso.`,
			statusCode: 201,
			data: {
				id: tag.id,
			},
		} as ApiResponse);
	}
}
