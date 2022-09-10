import { ApiError } from '../../../helpers/types/api-error';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';

export class RecuperandoImagens {
	constructor(private imagemRepositorio: ImagemRepositorio) {}

	async executar() {
		const imagem = await this.imagemRepositorio.read();

		if (!imagem) throw new ApiError('Nenhuma imagem encontrada', 404);

		return imagem;
	}
}
