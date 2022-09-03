import { Request, Response } from 'express';
import { ApiResponse } from '../helpers/types/api-response';
import {
	AutenticandoUsuario,
	AutenticandoUsuarioRequisicao,
} from '../app/usecases/usuario/autenticando-usuario';
import { PrismaAutenticacaoRepositorio } from '../app/repositories/prisma/PrismaAutenticacaoRepositorio';

export class AutenticacaoControlador {
	async autenticar(req: Request, res: Response): Promise<Response> {
		const data: AutenticandoUsuarioRequisicao = req.body;
		const autenticacaoRepositorio = new PrismaAutenticacaoRepositorio();
		const autenticandoUsuario = new AutenticandoUsuario(
			autenticacaoRepositorio,
		);

		const token = await autenticandoUsuario.executar(data);
		console.log(token);
		return res.status(200).json({
			message: `Usuario autenticado com sucesso`,
			statusCode: 200,
			data: {
				jwt: token,
			},
		} as ApiResponse);
	}
}
