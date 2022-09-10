import { ApiError } from '../../../helpers/types/api-error';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';

export type BuscandoImagensRequisicao = {
	query: string;
};

export class BuscandoImagens {
	constructor(private imagemRepositorio: ImagemRepositorio) {}

	async executar({ query }: BuscandoImagensRequisicao) {
		await validacaoDaRequisicao({
			query,
		});

		const imagem = await this.imagemRepositorio.search(query);

		if (imagem.length === 0)
			throw new ApiError('Nenhuma imagem encontrada.', 404);

		return imagem;
	}
}

async function validacaoDaRequisicao({ query }: BuscandoImagensRequisicao) {
	const campos = {
		query,
	};

	for (const [key, value] of Object.entries(campos)) {
		if (value == null || value === undefined) {
			throw new ApiError(`Campo '${key}' ausente na requisição.`, 400);
		}
	}
}
