import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { Imagem } from '../../../domain/entities/imagem';
import { ApiError } from '../../../helpers/types/api-error';
import { DeletandoImagem } from './deletando-imagem';
import {
	adiministrador,
	moderador,
	usuario,
} from '../../../../tests/usuario-memory';
import { usuario_imagem } from '../../../../tests/imagem-memory';

describe('Deletando imagem usecase', () => {
	let usuarioRepositorio: InMemoryUsuarioRepositorio;
	let imagemRepositorio: InMemoryImagemRepositorio;
	let erro: unknown;
	beforeEach(() => {
		usuarioRepositorio = new InMemoryUsuarioRepositorio();
		imagemRepositorio = new InMemoryImagemRepositorio();
	});
	it('Quando for chamado, e os dados forem passado corretamente, então a imagem deve ser deletada com sucesso', async () => {
		const sut = new DeletandoImagem(usuarioRepositorio, imagemRepositorio);
		const res = await sut.executar({
			deletadoEm: new Date(),
			idDaImagem: usuario_imagem.id,
			idDoUsuario: adiministrador.id,
		});
		expect(res).toBeInstanceOf(Imagem);
	});
	it('Quando for chamado, e o idDoUsuario corresponder a um usuario sem permissões, então deve disparar um erro', async () => {
		const sut = new DeletandoImagem(usuarioRepositorio, imagemRepositorio);
		try {
			await sut.executar({
				deletadoEm: new Date(),
				idDaImagem: usuario_imagem.id,
				idDoUsuario: moderador.id,
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Não authorizado.`, 400));
	});
	it('Quando for chamado, e o idDoUsuario não corresponder a um usuario valido, então deve disparar um erro', async () => {
		const sut = new DeletandoImagem(usuarioRepositorio, imagemRepositorio);
		try {
			await sut.executar({
				deletadoEm: new Date(),
				idDaImagem: usuario_imagem.id,
				idDoUsuario: 'Id inexistente',
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(`Usuario 'Id inexistente' não encontrado.`, 404),
		);
	});
	it('Quando for chamado, e o idDaImagem não corresponder a uma imagem valida, então deve disparar um erro', async () => {
		const sut = new DeletandoImagem(usuarioRepositorio, imagemRepositorio);
		try {
			await sut.executar({
				deletadoEm: new Date(),
				idDaImagem: 'Id inexistente',
				idDoUsuario: usuario.id,
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(`Imagem 'Id inexistente' não encontrada.`, 404),
		);
	});

	test.each`
		idDaImagem | idDoUsuario | deletadoEm    | esperado
		${null}    | ${'1'}      | ${new Date()} | ${'idDaImagem'}
		${'1'}     | ${null}     | ${new Date()} | ${'idDoUsuario'}
		${'1'}     | ${'1'}      | ${null}       | ${'deletadoEm'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({ idDaImagem, idDoUsuario, deletadoEm, esperado }) => {
			const sut = new DeletandoImagem(usuarioRepositorio, imagemRepositorio);
			if (idDaImagem) idDaImagem = usuario_imagem.id;
			if (idDoUsuario) idDoUsuario = usuario.id;
			try {
				await sut.executar({
					deletadoEm: deletadoEm,
					idDaImagem: idDaImagem,
					idDoUsuario: idDoUsuario,
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
