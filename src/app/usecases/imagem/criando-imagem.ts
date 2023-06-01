import path from 'path';
import { Imagem } from '../../../domain/entities/imagem';
import { TipoDeCargo } from '../../../domain/entities/usuario';
import { ApiError } from '../../../helpers/types/api-error';
import { StorageProvider } from '../../../utils/StorageProvider';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';
import multerConfig from '../../../config/multer';
import fs from 'fs';

export type CriandoImagemRequisicao = {
	nome: string;
	data: Date;
	endereco: string;
	latitude: string;
	longitude: string;
	idDoUsuario: string;
	criadoEm: Date;
	atualizadoEm: Date;
	eSugestao: boolean;
	file: Express.Multer.File | undefined;
};

export class CriandoImagem {
	constructor(
		private usuarioRepositorio: UsuarioRepositorio,
		private imagemRepositorio: ImagemRepositorio,
		private storageProvider: StorageProvider,
	) {}

	async executar({
		nome,
		data,
		endereco,
		idDoUsuario,
		latitude,
		longitude,
		criadoEm,
		atualizadoEm,
		eSugestao,
		file,
	}: CriandoImagemRequisicao) {
		await validacaoDaRequisicao(
			{
				nome,
				data,
				endereco,
				idDoUsuario,
				latitude,
				longitude,
				criadoEm,
				atualizadoEm,
				eSugestao,
				file,
			},
			this.usuarioRepositorio,
		);

		const url = await this.storageProvider.upload(file!.filename);

		const imagem = Imagem.criar(
			{
				nome,
				data,
				endereco,
				idDoUsuario,
				latitude,
				longitude,
				url,
				visualizacoes: 0,
				eSugestao,
			},
			criadoEm,
			atualizadoEm,
		);

		await this.imagemRepositorio.create(imagem);

		return imagem;
	}
}

async function validacaoDaRequisicao(
	{
		nome,
		data,
		endereco,
		idDoUsuario,
		latitude,
		longitude,
		criadoEm,
		atualizadoEm,
		eSugestao,
		file,
	}: CriandoImagemRequisicao,
	usuarioRepositorio: UsuarioRepositorio,
) {
	const campos = {
		nome,
		data,
		endereco,
		idDoUsuario,
		latitude,
		longitude,
		criadoEm,
		atualizadoEm,
		eSugestao,
		file,
	};

	for (const [key, value] of Object.entries(campos)) {
		if (value == null || value === undefined) {
			throw new ApiError(`Campo '${key}' ausente na requisição.`, 400);
		}
	}

	const usuario = await usuarioRepositorio.findById(idDoUsuario);
	if (!usuario) {
		throw new ApiError(`Usuario '${idDoUsuario}' não encontrado.`, 404);
	}

	if (usuario.props.cargo == TipoDeCargo.USUARIO && !eSugestao) {
		throw new ApiError(`Não autorizado.`, 401);
	}

	if (
		file &&
		file.mimetype !== 'image/jpeg' &&
		file.mimetype !== 'image/png' &&
		file.mimetype !== 'image/webp'
	) {
		throw new ApiError(`Formato de arquivo inválido.`, 400);
	}
}
