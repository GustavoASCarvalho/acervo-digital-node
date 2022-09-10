import { ApiError } from '../../../helpers/types/api-error';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';

export class RecuperandoImagens {
	constructor(private imagemRepositorio: ImagemRepositorio) {}

	async executar() {
		const imagens = await this.imagemRepositorio.read();

		if (imagens.length === 0)
			throw new ApiError('Nenhuma imagem encontrada.', 404);

		return imagens;
	}
}
