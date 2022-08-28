import { Request, Response } from 'express';
import {
	CriandoUsuario,
	CriandoUsuarioRequisicao,
} from '../app/usecases/usuario/criando-usuario';

import { PrismaUsuarioRepositorio } from '../app/repositories/prisma/PrismaUsuarioRepositorio';

export class UsuarioControlador {
	async create(req: Request, res: Response): Promise<Response> {
		const { nome, email, senha, imagemDePerfil }: CriandoUsuarioRequisicao =
			req.body;
		const usuarioRepositorio = new PrismaUsuarioRepositorio();
		const criandoUsuario = new CriandoUsuario(usuarioRepositorio);

		await criandoUsuario.executar({ nome, email, senha, imagemDePerfil });
		return res.status(201).json({ message: 'sucesso' });
	}
}
