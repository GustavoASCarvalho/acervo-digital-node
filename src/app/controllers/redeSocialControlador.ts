import { Request, Response } from 'express';
import { ApiResponse } from '../../helpers/types/api-response';
import { PrismaRedeSocialRepositorio } from '../repositories/prisma/PrismaRedeSocialRepositorio';
import {
	CriandoRedeSocial,
	CriandoRedeSocialRequisicao,
} from '../usecases/rede-social/criando-rede-social';

export class RedeSocialControlador {
	async create(req: Request, res: Response): Promise<Response> {
		const data: CriandoRedeSocialRequisicao = req.body;
		const redeSocialRepositorio = new PrismaRedeSocialRepositorio();
		const criandoRedeSocial = new CriandoRedeSocial(redeSocialRepositorio);

		const redesocial = await criandoRedeSocial.executar(data);

		return res.status(201).json({
			message: `RedeSocial '${data.nome}' criada com sucesso.`,
			statusCode: 201,
			data: {
				id: redesocial.id,
			},
		} as ApiResponse);
	}
}
