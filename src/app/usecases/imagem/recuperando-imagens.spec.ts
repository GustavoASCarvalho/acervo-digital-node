import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { ApiError } from '../../../helpers/types/api-error';
import { RecuperandoImagens } from './recuperando-imagens';
import { imagens } from '../../../../tests/imagem-memory';

describe('Criando imagem usecase', () => {
	let imagemRepositorio: InMemoryImagemRepositorio;
	let erro: unknown;
	beforeEach(() => {
		imagemRepositorio = new InMemoryImagemRepositorio();
	});
	it('Quando for chamado, e existir imagens, deve retornar as imagens', async () => {
		const sut = new RecuperandoImagens(imagemRepositorio);
		const res = await sut.executar();
		expect(res).toBe(imagens);
	});
	it('Quando for chamado, e , porém não corresponderem a uma imagem, deve disparar um erro', async () => {
		imagemRepositorio.itens = [];
		const sut = new RecuperandoImagens(imagemRepositorio);
		try {
			await sut.executar();
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Nenhuma imagem encontrada.`, 404));
	});
});
