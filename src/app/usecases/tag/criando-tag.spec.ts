import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryTagRepositorio } from '../../../../tests/repositories/in-memory-tag-repositorio';
import { Tag } from '../../../domain/entities/tag';
import {
	TipoDeCargo,
	PropriedadesDoUsuario,
	Usuario,
} from '../../../domain/entities/usuario';
import { CriandoTag } from './criando-tag';
import { ApiError } from '../../../helpers/types/api-error';

describe('Criando tag usecase', () => {
	let usuarioRepositorio: InMemoryUsuarioRepositorio;
	let tagRepositorio: InMemoryTagRepositorio;
	let usuario: Usuario;
	let erro: unknown;
	beforeEach(() => {
		usuarioRepositorio = new InMemoryUsuarioRepositorio();
		tagRepositorio = new InMemoryTagRepositorio();
		const propriedadesDoUsuario: PropriedadesDoUsuario = {
			nome: 'Usuario',
			email: 'usuario@email.com',
			senha: 'senha',
			imagemDePerfil: 'https://www.imagem.com/image.png',
			cargo: TipoDeCargo.USUARIO,
		};
		usuario = Usuario.criar(propriedadesDoUsuario, new Date(), new Date());
	});
	it('Quando for chamado, e os dados forem passado corretamente, então a tag deve ser criada com sucesso', async () => {
		usuarioRepositorio.itens.push(usuario);
		const sut = new CriandoTag(usuarioRepositorio, tagRepositorio);
		const res = await sut.executar({
			idDoUsuario: usuario.id,
			nome: 'nome',
			atualizadoEm: new Date(),
			criadoEm: new Date(),
		});
		expect(res).toBeInstanceOf(Tag);
	});
	it('Quando for chamado, e o idDoUsuario não corresponder a um usuario valido, então deve disparar um erro', async () => {
		const sut = new CriandoTag(usuarioRepositorio, tagRepositorio);

		try {
			await sut.executar({
				idDoUsuario: 'Id inexistente',
				nome: 'nome',
				atualizadoEm: new Date(),
				criadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(`Usuario 'Id inexistente' não encontrado.`, 404),
		);
	});
	test.each`
		nome           | idDoUsuario | criadoEm      | atualizadoEm  | esperado
		${null}        | ${'1'}      | ${new Date()} | ${new Date()} | ${'nome'}
		${'descricao'} | ${null}     | ${new Date()} | ${new Date()} | ${'idDoUsuario'}
		${'descricao'} | ${'1'}      | ${null}       | ${new Date()} | ${'criadoEm'}
		${'descricao'} | ${'1'}      | ${new Date()} | ${null}       | ${'atualizadoEm'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({ nome, idDoUsuario, criadoEm, atualizadoEm, esperado }) => {
			usuarioRepositorio.itens.push(usuario);
			const sut = new CriandoTag(usuarioRepositorio, tagRepositorio);

			try {
				await sut.executar({
					nome: nome,
					idDoUsuario: idDoUsuario ? usuario.id : idDoUsuario,
					criadoEm: criadoEm,
					atualizadoEm: atualizadoEm,
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
