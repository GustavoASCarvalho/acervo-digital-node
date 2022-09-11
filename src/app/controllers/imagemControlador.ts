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
import { BuscandoImagens } from '../usecases/imagem/buscando-imagens';
import { Imagem } from '../../domain/entities/imagem';
import { RecuperandoImagens } from '../usecases/imagem/recuperando-imagens';
import { RecuperandoImagem } from '../usecases/imagem/recuperando-imagem';
import { ApiError } from '../../helpers/types/api-error';
import {
	AtualizandoImagem,
	AtualizandoImagemRequisicao,
} from '../usecases/imagem/atualizando-imagem';

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
	async search(req: Request, res: Response): Promise<Response> {
		const { query } = req.query;
		let imagens: Imagem[];
		const imagemRepositorio = new PrismaImagemRepositorio();
		if (typeof query !== 'string' && query) {
			throw new ApiError(
				`Paramentro de busca "query" deve ser uma string`,
				400,
			);
		}
		if (query) {
			const buscandoImagens = new BuscandoImagens(imagemRepositorio);
			imagens = await buscandoImagens.executar({ query });
		} else {
			const recuperandoImagens = new RecuperandoImagens(imagemRepositorio);
			imagens = await recuperandoImagens.executar();
		}
		return res.status(200).json({
			message: `Sucesso.`,
			statusCode: 200,
			data: {
				imagens,
			},
		} as ApiResponse);
	}
	async read(req: Request, res: Response): Promise<Response> {
		const id = req.params['id'];
		const imagemRepositorio = new PrismaImagemRepositorio();
		const recuperandoImagem = new RecuperandoImagem(imagemRepositorio);

		const imagem = await recuperandoImagem.executar({ id });

		return res.status(200).json({
			message: `Imagem '${imagem.id}' encontrada com sucesso.`,
			statusCode: 200,
			data: {
				imagem,
			},
		} as ApiResponse);
	}

	async update(req: Request, res: Response): Promise<Response> {
		const {
			nome,
			data,
			endereco,
			latitude,
			longitude,
			criadoEm,
			atualizadoEm,
			eSugestao,
		} = req.body;
		const id = req.params['id'];
		const idDoUsuario = res.locals.id;
		const dataReq = {
			id,
			nome,
			data,
			endereco,
			latitude,
			longitude,
			idDoUsuario,
			criadoEm,
			atualizadoEm,
			eSugestao,
		} as AtualizandoImagemRequisicao;

		const usuarioRepositorio = new PrismaUsuarioRepositorio();
		const imagemRepositorio = new PrismaImagemRepositorio();
		const atualizandoImagem = new AtualizandoImagem(
			usuarioRepositorio,
			imagemRepositorio,
		);

		const imagem = await atualizandoImagem.executar(dataReq);

		return res.status(201).json({
			message: `Imagem '${imagem.props.nome}' atualizada com sucesso.`,
			statusCode: 201,
			data: {
				id: imagem.id,
			},
		} as ApiResponse);
	}
}
