import { Imagem } from '../../../domain/entities/imagem';
import { TipoDeCargo } from '../../../domain/entities/usuario';
import { ApiError } from '../../../helpers/types/api-error';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type AtualizandoImagemRequisicao = {
	id: string;
	nome: string;
	data: Date;
	endereco: string;
	latitude: string;
	longitude: string;
	idDoUsuario: string;
	criadoEm: Date;
	atualizadoEm: Date;
	eSugestao: boolean;
};

export class AtualizandoImagem {
	constructor(
		private usuarioRepositorio: UsuarioRepositorio,
		private imagemRepositorio: ImagemRepositorio,
	) {}

	async executar({
		id,
		nome,
		data,
		endereco,
		latitude,
		longitude,
		criadoEm,
		atualizadoEm,
		eSugestao,
		idDoUsuario,
	}: AtualizandoImagemRequisicao) {
		await validacaoDaRequisicao(
			{
				id,
				nome,
				data,
				endereco,
				latitude,
				longitude,
				criadoEm,
				atualizadoEm,
				eSugestao,
				idDoUsuario,
			},
			this.usuarioRepositorio,
		);

		const imagem = await this.imagemRepositorio.update({
			id,
			nome,
			data,
			endereco,
			latitude,
			longitude,
			criadoEm,
			atualizadoEm,
			eSugestao,
			idDoUsuario,
		});

		return imagem;
	}
}

async function validacaoDaRequisicao(
	{
		id,
		nome,
		data,
		endereco,
		idDoUsuario,
		latitude,
		longitude,
		atualizadoEm,
		criadoEm,
		eSugestao,
	}: AtualizandoImagemRequisicao,
	usuarioRepositorio: UsuarioRepositorio,
) {
	const campos = {
		id,
		nome,
		data,
		endereco,
		idDoUsuario,
		latitude,
		longitude,
		criadoEm,
		atualizadoEm,
		eSugestao,
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

	if (usuario.props.cargo == TipoDeCargo.USUARIO) {
		throw new ApiError(`Não autorizado.`, 401);
	}
}
