import { Request, Response } from 'express';
import {
	CriandoUsuario,
	CriandoUsuarioRequisicao,
} from '../app/usecases/usuario/criando-usuario';

import { PrismaUsuarioRepositorio } from '../app/repositories/prisma/PrismaUsuarioRepositorio';
import { ApiResponse } from '../helpers/types/api-response';

export class UsuarioControlador {
	async create(req: Request, res: Response): Promise<Response> {
		const { nome, email, senha, imagemDePerfil }: CriandoUsuarioRequisicao =
			req.body;
		const usuarioRepositorio = new PrismaUsuarioRepositorio();
		const criandoUsuario = new CriandoUsuario(usuarioRepositorio);

		const usuario = await criandoUsuario.executar({
			nome,
			email,
			senha,
			imagemDePerfil,
		});
		return res.status(201).json({
			message: `Usuario '${nome}' criado com sucesso`,
			statusCode: 201,
			data: {
				id: usuario.id,
			},
		} as ApiResponse);
	}
}
