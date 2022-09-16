import { InMemoryTagRepositorio } from '../../../../tests/repositories/in-memory-tag-repositorio';
import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { usuario } from '../../../../tests/usuario-memory';
import { Tag } from '../../../domain/entities/tag';
import { ApiError } from '../../../helpers/types/api-error';
import { CriandoTag } from './criando-tag';

describe('Criando tag usecase', () => {
	let erro: unknown;
	let tagRepositorio: InMemoryTagRepositorio;
	let usuarioRepositorio: InMemoryUsuarioRepositorio;
	beforeEach(() => {
		tagRepositorio = new InMemoryTagRepositorio();
		usuarioRepositorio = new InMemoryUsuarioRepositorio();
	});
	it('Quando for chamado, e os dados forem passado corretamente, então o tag deve ser criado com sucesso', async () => {
		const sut = new CriandoTag(usuarioRepositorio, tagRepositorio);
		const res = await sut.executar({
			idDoUsuario: usuario.id,
			nome: 'Tag dahora',
			criadoEm: new Date(),
			atualizadoEm: new Date(),
		});
		expect(res).toBeInstanceOf(Tag);
	});
	it('Quando for chamado, e o idDoUsuario não corresponder a nenhum usuario, então deve disparar um erro', async () => {
		const tagRepositorio = new InMemoryTagRepositorio();
		const sut = new CriandoTag(usuarioRepositorio, tagRepositorio);

		try {
			await sut.executar({
				idDoUsuario: 'Id inexistente',
				nome: 'Tag dahora',
				criadoEm: new Date(),
				atualizadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(`Usuario 'Id inexistente' não encontrado.`, 404),
		);
	});
	test.each`
		nome      | idDoUsuario | criadoEm      | atualizadoEm  | esperado
		${null}   | ${'2'}      | ${new Date()} | ${new Date()} | ${'nome'}
		${'nome'} | ${null}     | ${new Date()} | ${new Date()} | ${'idDoUsuario'}
		${'nome'} | ${'2'}      | ${null}       | ${new Date()} | ${'criadoEm'}
		${'nome'} | ${'2'}      | ${new Date()} | ${null}       | ${'atualizadoEm'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({ nome, idDoUsuario, criadoEm, atualizadoEm, esperado }) => {
			const tagRepositorio = new InMemoryTagRepositorio();
			const sut = new CriandoTag(usuarioRepositorio, tagRepositorio);
			try {
				await sut.executar({
					nome: nome,
					idDoUsuario: idDoUsuario ? usuario.id : idDoUsuario,
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
