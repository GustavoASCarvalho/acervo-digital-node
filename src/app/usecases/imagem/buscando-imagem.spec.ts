import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { ApiError } from '../../../helpers/types/api-error';
import { BuscandoImagens } from './buscando-imagens';
import { usuario_imagem } from '../../../../tests/imagem-memory';

describe('Criando imagem usecase', () => {
	let imagemRepositorio: InMemoryImagemRepositorio;
	let erro: unknown;
	beforeEach(() => {
		imagemRepositorio = new InMemoryImagemRepositorio();
	});
	it('Quando for chamado, e os dados forem passado corretamente, deve retornanr as imagens correspondentes', async () => {
		const sut = new BuscandoImagens(imagemRepositorio);
		const res = await sut.executar({
			query: usuario_imagem.props.nome,
		});
		expect(res).toBeInstanceOf(Array);
	});
	it('Quando for chamado, e o dados forem passados corretamente, porém não corresponderem a uma imagem, deve disparar um erro', async () => {
		const sut = new BuscandoImagens(imagemRepositorio);
		try {
			await sut.executar({
				query: '~~ ~',
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Nenhuma imagem encontrada.`, 404));
	});

	test.each`
		query   | esperado
		${null} | ${'query'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({ query, esperado }) => {
			const sut = new BuscandoImagens(imagemRepositorio);

			try {
				await sut.executar({
					query: query,
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
