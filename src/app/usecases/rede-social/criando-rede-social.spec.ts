import { ApiError } from '../../../helpers/types/api-error';
import { InMemoryRedeSocialRepositorio } from '../../../../tests/repositories/in-memory-rede-social-repositorio';
import { RedeSocial } from '../../../domain/entities/redeSocial';
import { CriandoRedeSocial } from './criando-rede-social';

describe('Criando redesocial usecase', () => {
	let erro: unknown;
	let redesocialRepositorio: InMemoryRedeSocialRepositorio;
	beforeEach(() => {
		redesocialRepositorio = new InMemoryRedeSocialRepositorio();
	});
	it('Quando for chamado, e os dados forem passado corretamente, então o redesocial deve ser criado com sucesso', async () => {
		const sut = new CriandoRedeSocial(redesocialRepositorio);
		const res = await sut.executar({
			nome: 'Orkut',
			url: 'http://orkut.com',
			criadoEm: new Date(),
			atualizadoEm: new Date(),
		});
		expect(res).toBeInstanceOf(RedeSocial);
	});
	it('Quando for chamado, e a url for invalida, então deve disparar um erro', async () => {
		const redesocialRepositorio = new InMemoryRedeSocialRepositorio();
		const sut = new CriandoRedeSocial(redesocialRepositorio);

		try {
			await sut.executar({
				nome: 'Orkut',
				url: '][][} } {',
				criadoEm: new Date(),
				atualizadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Campo 'url' invalido`, 400));
	});
	test.each`
		nome      | url                   | criadoEm      | atualizadoEm  | esperado
		${null}   | ${'http://orkut.com'} | ${new Date()} | ${new Date()} | ${'nome'}
		${'nome'} | ${null}               | ${new Date()} | ${new Date()} | ${'url'}
		${'nome'} | ${'http://orkut.com'} | ${null}       | ${new Date()} | ${'criadoEm'}
		${'nome'} | ${'http://orkut.com'} | ${new Date()} | ${null}       | ${'atualizadoEm'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({ nome, url, criadoEm, atualizadoEm, esperado }) => {
			const redesocialRepositorio = new InMemoryRedeSocialRepositorio();
			const sut = new CriandoRedeSocial(redesocialRepositorio);
			try {
				await sut.executar({
					nome: nome,
					url: url,
					atualizadoEm: atualizadoEm,
					criadoEm: criadoEm,
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
