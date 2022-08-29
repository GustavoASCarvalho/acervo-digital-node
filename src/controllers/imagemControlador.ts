import { Request, Response } from 'express';
import {
	CriandoImagem,
	CriandoImagemRequisicao,
} from '../app/usecases/imagem/criando-imagem';
import { PrismaUsuarioRepositorio } from '../app/repositories/prisma/PrismaUsuarioRepositorio';
import { PrismaImagemRepositorio } from '../app/repositories/prisma/PrismaImagemRepositorio';
import { ApiResponse } from '../helpers/types/api-response';

export class ImagemControlador {
	async create(req: Request, res: Response): Promise<Response> {
		const data: CriandoImagemRequisicao = req.body;
		const usuarioRepositorio = new PrismaUsuarioRepositorio();
		const imagemRepositorio = new PrismaImagemRepositorio();
		const criandoImagem = new CriandoImagem(
			usuarioRepositorio,
			imagemRepositorio,
		);

		const imagem = await criandoImagem.executar(data);

		return res.status(201).json({
			message: `Imagem '${data.nome}' criada com sucesso.`,
			statusCode: 201,
			data: {
				id: imagem.id,
			},
		} as ApiResponse);
	}
}
