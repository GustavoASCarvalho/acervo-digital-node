import { RedeSocial } from '../../../domain/entities/redeSocial';
import { ApiError } from '../../../helpers/types/api-error';
import { RedeSocialRepositorio } from '../../repositories/RedeSocialRepositorio';

export type CriandoRedeSocialRequisicao = {
	nome: string;
	url: string;
	criadoEm: Date;
	atualizadoEm: Date;
};

export class CriandoRedeSocial {
	constructor(private redesocialRepositorio: RedeSocialRepositorio) {}

	async executar({
		nome,
		url,
		criadoEm,
		atualizadoEm,
	}: CriandoRedeSocialRequisicao) {
		await validacaoDaRequisicao({
			nome,
			url,
			criadoEm,
			atualizadoEm,
		});

		const redesocial = RedeSocial.criar(
			{
				nome,
				url,
			},
			criadoEm,
			atualizadoEm,
		);

		await this.redesocialRepositorio.create(redesocial);

		return redesocial;
	}
}

async function validacaoDaRequisicao({
	nome,
	url,
	criadoEm,
	atualizadoEm,
}: CriandoRedeSocialRequisicao) {
	const campos = { nome, url, criadoEm, atualizadoEm };

	for (const [key, value] of Object.entries(campos)) {
		if (value == null || value === undefined) {
			throw new ApiError(`Campo '${key}' ausente na requisição.`, 400);
		}
	}

	if (!(url.startsWith('http://') || url.startsWith('https://'))) {
		throw new ApiError(`Campo 'url' invalido`, 400);
	}
}
