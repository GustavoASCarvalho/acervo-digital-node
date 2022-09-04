import { Request, Response } from 'express';
import {
	CriandoUsuario,
	CriandoUsuarioRequisicao,
} from '../usecases/usuario/criando-usuario';

import { PrismaUsuarioRepositorio } from '../repositories/prisma/PrismaUsuarioRepositorio';
import { ApiResponse } from '../../helpers/types/api-response';

export class UsuarioControlador {
	async create(req: Request, res: Response): Promise<Response> {
		const data: CriandoUsuarioRequisicao = req.body;
		const usuarioRepositorio = new PrismaUsuarioRepositorio();
		const criandoUsuario = new CriandoUsuario(usuarioRepositorio);

		const usuario = await criandoUsuario.executar(data);
		return res.status(201).json({
			message: `Usuario '${data.nome}' criado com sucesso`,
			statusCode: 201,
			data: {
				id: usuario.id,
			},
		} as ApiResponse);
	}
}
