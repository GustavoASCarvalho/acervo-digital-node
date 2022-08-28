import { Imagem } from '../../../domain/entities/imagem';
import { ApiError } from '../../../helpers/api-error';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type CriandoImagemRequisicao = {
	nome: string;
	data: string;
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
	let mensagensDeErro: string[] = [];

	if (!nome) {
		mensagensDeErro.push(`O campo 'nome' não está presente na requisição.`);
	}
	if (!data) {
		mensagensDeErro.push(`O campo 'data' não está presente na requisição.`);
	}
	if (!endereco) {
		mensagensDeErro.push(`O campo 'endereco' não está presente na requisição.`);
	}
	if (!idDoUsuario) {
		mensagensDeErro.push(
			`O campo 'idDoUsuario' não está presente na requisição.`,
		);
	}
	if (!latitude) {
		mensagensDeErro.push(`O campo 'latitude' não está presente na requisição.`);
	}
	if (!longitude) {
		mensagensDeErro.push(
			`O campo 'longitude' não está presente na requisição.`,
		);
	}
	if (mensagensDeErro.length > 0) {
		throw new ApiError(mensagensDeErro, 400);
	}

	const usuario = await usuarioRepositorio.findById(idDoUsuario);
	if (!usuario) {
		throw new ApiError([`Usuario '${idDoUsuario}' não encontrado.`], 404);
	}
}
