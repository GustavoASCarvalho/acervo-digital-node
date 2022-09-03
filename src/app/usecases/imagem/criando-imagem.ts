import { Imagem } from '../../../domain/entities/imagem';
import { ApiError } from '../../../helpers/types/api-error';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type CriandoImagemRequisicao = {
	nome: string;
	data: Date;
	endereco: string;
	idDoUsuario: string;
	latitude: string;
	longitude: string;
};

export class CriandoImagem {
	constructor(
		private usuarioRepositorio: UsuarioRepositorio,
		private imagemRepositorio: ImagemRepositorio,
	) {}

	async executar({
		nome,
		data,
		endereco,
		idDoUsuario,
		latitude,
		longitude,
	}: CriandoImagemRequisicao) {
		await validacaoDaRequisicao(
			{ nome, data, endereco, idDoUsuario, latitude, longitude },
			this.usuarioRepositorio,
		);

		const imagem = Imagem.criar({
			nome,
			data,
			endereco,
			idDoUsuario,
			latitude,
			longitude,
			url: 'http://',
			visualizacoes: 0,
		});

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
	}: CriandoImagemRequisicao,
	usuarioRepositorio: UsuarioRepositorio,
) {
	if (!nome) {
		throw new ApiError(`Campo 'nome' ausente na requisição.`, 400);
	}
	if (!data) {
		throw new ApiError(`Campo 'data' ausente na requisição.`, 400);
	}
	if (!endereco) {
		throw new ApiError(`Campo 'endereco' ausente na requisição.`, 400);
	}
	if (!idDoUsuario) {
		throw new ApiError(`Campo 'idDoUsuario' ausente na requisição.`, 400);
	}
	if (!latitude) {
		throw new ApiError(`Campo 'latitude' ausente na requisição.`, 400);
	}
	if (!longitude) {
		throw new ApiError(`Campo 'longitude' ausente na requisição.`, 400);
	}
	const usuario = await usuarioRepositorio.findById(idDoUsuario);
	if (!usuario) {
		throw new ApiError(`Usuario '${idDoUsuario}' não encontrado.`, 404);
	}
}
