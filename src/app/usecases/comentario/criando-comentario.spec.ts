import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryComentarioRepositorio } from '../../../../tests/repositories/in-memory-comentario-repositorio';
import { Comentario } from '../../../domain/entities/comentario';
import { CriandoComentario } from './criando-comentario';
import { ApiError } from '../../../helpers/types/api-error';
import { usuario } from '../../../../tests/usuario-memory';
import { moderador_imagem } from '../../../../tests/imagem-memory';
import { moderador_postagem } from '../../../../tests/postagem-memory';
import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { InMemoryPostagemRepositorio } from '../../../../tests/repositories/in-memory-postagem-repositorio';

describe('Criando comentario usecase', () => {
	let usuarioRepositorio: InMemoryUsuarioRepositorio;
	let comentarioRepositorio: InMemoryComentarioRepositorio;
	let imagemRepositorio: InMemoryImagemRepositorio;
	let postagemRepositorio: InMemoryPostagemRepositorio;

	let erro: unknown;
	beforeEach(() => {
		usuarioRepositorio = new InMemoryUsuarioRepositorio();
		imagemRepositorio = new InMemoryImagemRepositorio();
		comentarioRepositorio = new InMemoryComentarioRepositorio();
		postagemRepositorio = new InMemoryPostagemRepositorio();
	});
	it('Quando for chamado, e os dados forem passado corretamente, então a comentario deve ser criada com sucesso', async () => {
		const sut = new CriandoComentario(
			usuarioRepositorio,
			postagemRepositorio,
			imagemRepositorio,
			comentarioRepositorio,
		);
		const res = await sut.executar({
			titulo: 'novo comentario na imagem',
			texto: '<p>Meu comentario</p>',
			idDaImagem: moderador_imagem.id,
			idDoUsuario: usuario.id,
			criadoEm: new Date(),
			atualizadoEm: new Date(),
		});
		expect(res).toBeInstanceOf(Comentario);
	});
	it('Quando for chamado, e os dados forem passado corretamente, então a comentario deve ser criada com sucesso', async () => {
		const sut = new CriandoComentario(
			usuarioRepositorio,
			postagemRepositorio,
			imagemRepositorio,
			comentarioRepositorio,
		);
		const res = await sut.executar({
			titulo: 'novo comentario na postagem',
			texto: '<p>Meu comentario</p>',
			idDaPostagem: moderador_postagem.id,
			idDoUsuario: usuario.id,
			criadoEm: new Date(),
			atualizadoEm: new Date(),
		});
		expect(res).toBeInstanceOf(Comentario);
	});
	it('Quando for chamado, e o idDoUsuario não corresponder a um usuario valido, então deve disparar um erro', async () => {
		const sut = new CriandoComentario(
			usuarioRepositorio,
			postagemRepositorio,
			imagemRepositorio,
			comentarioRepositorio,
		);
		try {
			await sut.executar({
				titulo: 'novo comentario na postagem',
				texto: '<p>Meu comentario</p>',
				idDaImagem: moderador_postagem.id,
				idDoUsuario: 'Id inexistente',
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
	it('Quando for chamado, e o idDaImagem não corresponder a uma imagem valida, então deve disparar um erro', async () => {
		const sut = new CriandoComentario(
			usuarioRepositorio,
			postagemRepositorio,
			imagemRepositorio,
			comentarioRepositorio,
		);
		try {
			await sut.executar({
				titulo: 'novo comentario na postagem',
				texto: '<p>Meu comentario</p>',
				idDaImagem: 'Id inexistente',
				idDoUsuario: usuario.id,
				criadoEm: new Date(),
				atualizadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(`Imagem 'Id inexistente' não encontrada.`, 404),
		);
	});
	it('Quando for chamado, e o idDaPostagem não corresponder a uma postagem valida, então deve disparar um erro', async () => {
		const sut = new CriandoComentario(
			usuarioRepositorio,
			postagemRepositorio,
			imagemRepositorio,
			comentarioRepositorio,
		);
		try {
			await sut.executar({
				titulo: 'novo comentario na postagem',
				texto: '<p>Meu comentario</p>',
				idDaPostagem: 'Id inexistente',
				idDoUsuario: usuario.id,
				criadoEm: new Date(),
				atualizadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(`Postagem 'Id inexistente' não encontrada.`, 404),
		);
	});

	it('Quando for chamado, e não for passado o IdDaPostagem nem o IdDaImagem, então deve disparar um erro', async () => {
		const sut = new CriandoComentario(
			usuarioRepositorio,
			postagemRepositorio,
			imagemRepositorio,
			comentarioRepositorio,
		);
		try {
			await sut.executar({
				titulo: 'novo comentario na postagem',
				texto: '<p>Meu comentario</p>',
				idDoUsuario: usuario.id,
				criadoEm: new Date(),
				atualizadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(
				`Campo 'idDaPostagem' ou 'idDaImagem' ausente na requisição.`,
				400,
			),
		);
	});

	it('Quando for chamado, e for passado o IdDaPostagem e o IdDaImagem, então deve disparar um erro', async () => {
		const sut = new CriandoComentario(
			usuarioRepositorio,
			postagemRepositorio,
			imagemRepositorio,
			comentarioRepositorio,
		);
		try {
			await sut.executar({
				titulo: 'novo comentario na postagem',
				texto: '<p>Meu comentario</p>',
				idDaImagem: moderador_imagem.id,
				idDaPostagem: moderador_postagem.id,
				idDoUsuario: usuario.id,
				criadoEm: new Date(),
				atualizadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(
				`Só é permitido comentario em uma imagem ou em uma postagem.`,
				400,
			),
		);
	});

	test.each`
		titulo      | texto                 | idDoUsuario | criadoEm      | atualizadoEm  | esperado
		${null}     | ${'<p>Meu textp</P>'} | ${'2'}      | ${new Date()} | ${new Date()} | ${'titulo'}
		${'titulo'} | ${null}               | ${'2'}      | ${new Date()} | ${new Date()} | ${'texto'}
		${'titulo'} | ${'<p>Meu textp</P>'} | ${null}     | ${new Date()} | ${new Date()} | ${'idDoUsuario'}
		${'titulo'} | ${'<p>Meu textp</P>'} | ${'2'}      | ${null}       | ${new Date()} | ${'criadoEm'}
		${'titulo'} | ${'<p>Meu textp</P>'} | ${'2'}      | ${new Date()} | ${null}       | ${'atualizadoEm'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({
			titulo,
			texto,
			idDoUsuario,
			criadoEm,
			atualizadoEm,
			esperado,
		}) => {
			const sut = new CriandoComentario(
				usuarioRepositorio,
				postagemRepositorio,
				imagemRepositorio,
				comentarioRepositorio,
			);

			try {
				await sut.executar({
					titulo: titulo,
					texto: texto,
					idDaImagem: moderador_imagem.id,
					idDaPostagem: moderador_postagem.id,
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
