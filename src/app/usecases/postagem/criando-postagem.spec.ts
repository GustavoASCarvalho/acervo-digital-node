import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryPostagemRepositorio } from '../../../../tests/repositories/in-memory-postagem-repositorio';
import { Postagem } from '../../../domain/entities/postagem';
import {
	TipoDeCargo,
	PropriedadesDoUsuario,
	Usuario,
} from '../../../domain/entities/usuario';
import { CriandoPostagem } from './criando-postagem';
import { ApiError } from '../../../helpers/types/api-error';

describe('Criando postagem usecase', () => {
	let usuarioRepositorio: InMemoryUsuarioRepositorio;
	let postagemRepositorio: InMemoryPostagemRepositorio;
	let usuario: Usuario;
	let erro: unknown;
	beforeEach(() => {
		usuarioRepositorio = new InMemoryUsuarioRepositorio();
		postagemRepositorio = new InMemoryPostagemRepositorio();
		const propriedadesDoUsuario: PropriedadesDoUsuario = {
			nome: 'Usuario',
			email: 'usuario@email.com',
			senha: 'senha',
			imagemDePerfil: 'https://www.imagem.com/image.png',
			cargo: TipoDeCargo.USUARIO,
		};
		usuario = Usuario.criar(propriedadesDoUsuario, new Date(), new Date());
	});
	it('Quando for chamado, e os dados forem passado corretamente, então a postagem deve ser criada com sucesso', async () => {
		usuarioRepositorio.itens.push(usuario);
		const sut = new CriandoPostagem(usuarioRepositorio, postagemRepositorio);
		const res = await sut.executar({
			descricao: 'descrição',
			idDoUsuario: usuario.id,
			texto: 'texto',
			titulo: 'titulo',
			atualizadoEm: new Date(),
			criadoEm: new Date(),
		});
		expect(res).toBeInstanceOf(Postagem);
	});
	it('Quando for chamado, e o idDoUsuario não corresponder a um usuario valido, então deve disparar um erro', async () => {
		const sut = new CriandoPostagem(usuarioRepositorio, postagemRepositorio);

		try {
			await sut.executar({
				descricao: 'descrição',
				idDoUsuario: 'Id inexistente',
				texto: 'texto',
				titulo: 'titulo',
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
		descricao      | idDoUsuario | texto      | titulo      | criadoEm      | atualizadoEm  | esperado
		${null}        | ${'1'}      | ${'texto'} | ${'titulo'} | ${new Date()} | ${new Date()} | ${'descricao'}
		${'descricao'} | ${null}     | ${'texto'} | ${'titulo'} | ${new Date()} | ${new Date()} | ${'idDoUsuario'}
		${'descricao'} | ${'1'}      | ${null}    | ${'titulo'} | ${new Date()} | ${new Date()} | ${'texto'}
		${'descricao'} | ${'1'}      | ${'texto'} | ${null}     | ${new Date()} | ${new Date()} | ${'titulo'}
		${'descricao'} | ${'1'}      | ${'texto'} | ${'titulo'} | ${null}       | ${new Date()} | ${'criadoEm'}
		${'descricao'} | ${'1'}      | ${'texto'} | ${'titulo'} | ${new Date()} | ${null}       | ${'atualizadoEm'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({
			descricao,
			idDoUsuario,
			texto,
			titulo,
			criadoEm,
			atualizadoEm,
			esperado,
		}) => {
			usuarioRepositorio.itens.push(usuario);
			const sut = new CriandoPostagem(usuarioRepositorio, postagemRepositorio);

			try {
				await sut.executar({
					descricao: descricao,
					idDoUsuario: idDoUsuario ? usuario.id : idDoUsuario,
					texto: texto,
					titulo: titulo,
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
