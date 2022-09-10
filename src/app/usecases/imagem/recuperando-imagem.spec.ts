import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { ApiError } from '../../../helpers/types/api-error';
import { usuario_imagem } from '../../../../tests/imagem-memory';
import { RecuperandoImagem } from './recuperando-imagem';

describe('Criando imagem usecase', () => {
	let imagemRepositorio: InMemoryImagemRepositorio;
	let erro: unknown;
	beforeEach(() => {
		imagemRepositorio = new InMemoryImagemRepositorio();
	});
	it('Quando for chamado, e os dados forem passado corretamente, deve retornanr a imagem correspondente', async () => {
		const sut = new RecuperandoImagem(imagemRepositorio);
		const res = await sut.executar({
			id: usuario_imagem.id,
		});
		expect(res).toBe(usuario_imagem);
	});
	it('Quando for chamado, e o dados forem passados corretamente, porém não corresponderem a uma imagem, deve disparar um erro', async () => {
		const sut = new RecuperandoImagem(imagemRepositorio);
		try {
			await sut.executar({
				id: '~~ ~',
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Nenhuma imagem encontrada.`, 404));
	});

	test.each`
		id      | esperado
		${null} | ${'id'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({ id, esperado }) => {
			const sut = new RecuperandoImagem(imagemRepositorio);

			try {
				await sut.executar({
					id: id,
				});
			} catch (err) {
				erro = err;
			}
			expect(erro).toEqual(
				new ApiError(`Campo '${esperado}' ausente na requisição.`, 400),
			);
		},
	);
});
