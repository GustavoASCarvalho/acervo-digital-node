import { Request, Response } from 'express';
import {
	CriandoImagem,
	CriandoImagemRequisicao,
} from '../usecases/imagem/criando-imagem';
import { PrismaUsuarioRepositorio } from '../repositories/prisma/PrismaUsuarioRepositorio';
import { PrismaImagemRepositorio } from '../repositories/prisma/PrismaImagemRepositorio';
import { ApiResponse } from '../../helpers/types/api-response';
import {
	DeletandoImagem,
	DeletandoImagemRequisicao,
} from '../usecases/imagem/deletando-imagem';

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
	async delete(req: Request, res: Response): Promise<Response> {
		const { deletadoEm } = req.body;
		const idDaImagem = req.params['id'];
		const idDoUsuario = res.locals.id;
		const data = {
			idDaImagem,
			deletadoEm,
			idDoUsuario,
		} as DeletandoImagemRequisicao;

		const usuarioRepositorio = new PrismaUsuarioRepositorio();
		const imagemRepositorio = new PrismaImagemRepositorio();
		const deletandoImagem = new DeletandoImagem(
			usuarioRepositorio,
			imagemRepositorio,
		);

		const imagem = await deletandoImagem.executar(data);

		return res.status(200).json({
			message: `Imagem '${imagem.id}' deletada com sucesso.`,
			statusCode: 200,
			data: {
				id: imagem.id,
			},
		} as ApiResponse);
	}
}
