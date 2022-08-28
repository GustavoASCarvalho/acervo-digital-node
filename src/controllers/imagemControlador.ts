import { Request, Response } from 'express';
import {
	CriandoImagem,
	CriandoImagemRequisicao,
} from '../app/usecases/imagem/criando-imagem';
import { PrismaUsuarioRepositorio } from '../app/repositories/prisma/PrismaUsuarioRepositorio';
import { PrismaImagemRepositorio } from '../app/repositories/prisma/PrismaImagemRepositorio';

export class ImagemControlador {
	async create(req: Request, res: Response): Promise<Response> {
		const data: CriandoImagemRequisicao = req.body;
		const usuarioRepositorio = new PrismaUsuarioRepositorio();
		const imagemRepositorio = new PrismaImagemRepositorio();
		const criandoImagem = new CriandoImagem(
			usuarioRepositorio,
			imagemRepositorio,
		);
		try {
			await criandoImagem.executar(data);
		} catch (err) {
			return res.status(404).json({ message: err });
		}
		return res.status(201).json({ message: 'sucesso' });
	}
}
