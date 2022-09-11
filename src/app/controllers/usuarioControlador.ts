import { Request, Response } from 'express';
import {
	CriandoUsuario,
	CriandoUsuarioRequisicao,
} from '../usecases/usuario/criando-usuario';

import { PrismaUsuarioRepositorio } from '../repositories/prisma/PrismaUsuarioRepositorio';
import { ApiResponse } from '../../helpers/types/api-response';
import {
	AtualizandoUsuario,
	AtualizandoUsuarioRequisicao,
} from '../usecases/usuario/atualizando-usuario';

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
	async update(req: Request, res: Response): Promise<Response> {
		const {
			nome,
			email,
			senha,
			imagemDePerfil,
			criadoEm,
			atualizadoEm,
			cargo,
		} = req.body;
		const id = req.params['id'];
		const idDoUsuario = res.locals.id;
		const dataReq = {
			id,
			idDoUsuario,
			nome,
			email,
			senha,
			imagemDePerfil,
			criadoEm,
			atualizadoEm,
			cargo,
		} as AtualizandoUsuarioRequisicao;

		const usuarioRepositorio = new PrismaUsuarioRepositorio();
		const atualizandoUsuario = new AtualizandoUsuario(usuarioRepositorio);

		const usuario = await atualizandoUsuario.executar(dataReq);

		return res.status(200).json({
			message: `Usuario '${usuario.props.nome}' atualizada com sucesso.`,
			statusCode: 200,
			data: {
				id: usuario.id,
			},
		} as ApiResponse);
	}
}
