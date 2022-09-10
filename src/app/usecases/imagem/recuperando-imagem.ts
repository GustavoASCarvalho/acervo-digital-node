import { ApiError } from '../../../helpers/types/api-error';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';

export type RecuperandoImagemRequisicao = {
	id: string;
};

export class RecuperandoImagem {
	constructor(private imagemRepositorio: ImagemRepositorio) {}

	async executar({ id }: RecuperandoImagemRequisicao) {
		await validacaoDaRequisicao({
			id,
		});

		const imagem = await this.imagemRepositorio.findById(id);

		if (!imagem) throw new ApiError('Nenhuma imagem encontrada.', 404);

		return imagem;
	}
}

async function validacaoDaRequisicao({ id }: RecuperandoImagemRequisicao) {
	const campos = {
		id,
	};

	for (const [key, value] of Object.entries(campos)) {
		if (value == null || value === undefined) {
			throw new ApiError(`Campo '${key}' ausente na requisição.`, 400);
		}
	}
}
