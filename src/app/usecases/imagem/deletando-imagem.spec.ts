import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { Imagem, PropriedadesDaImagem } from '../../../domain/entities/imagem';
import {
	TipoDeCargo,
	PropriedadesDoUsuario,
	Usuario,
} from '../../../domain/entities/usuario';
import { CriandoImagem } from './criando-imagem';
import { ApiError } from '../../../helpers/types/api-error';
import { DeletandoImagem } from './deletando-imagem';

describe('Deletando imagem usecase', () => {
	let usuarioRepositorio: InMemoryUsuarioRepositorio;
	let imagemRepositorio: InMemoryImagemRepositorio;
	let usuario: Usuario;
	let imagem: Imagem;
	let erro: unknown;
	beforeEach(() => {
		usuarioRepositorio = new InMemoryUsuarioRepositorio();
		imagemRepositorio = new InMemoryImagemRepositorio();
		const propriedadesDoUsuario: PropriedadesDoUsuario = {
			nome: 'Usuario',
			email: 'usuario@email.com',
			senha: 'senha',
			imagemDePerfil: 'https://www.imagem.com/image.png',
			cargo: TipoDeCargo.ADIMINISTRADOR,
		};
		usuario = Usuario.criar(propriedadesDoUsuario, new Date(), new Date());
		const propriedadesDaImagem: PropriedadesDaImagem = {
			data: new Date('26-05-2003'),
			endereco: 'Rua dos gatos',
			idDoUsuario: usuario.id,
			nome: 'Imagem de um gato',
			latitude: '34',
			longitude: '-122',
			url: 'http://www.imagem.com/image.png',
			visualizacoes: 0,
		};
		imagem = Imagem.criar(propriedadesDaImagem, new Date(), new Date());
	});
	it('Quando for chamado, e os dados forem passado corretamente, então o usuario deve ser criada com sucesso', async () => {
		usuarioRepositorio.itens.push(usuario);
		imagemRepositorio.itens.push(imagem);
		const sut = new DeletandoImagem(usuarioRepositorio, imagemRepositorio);
		const res = await sut.executar({
			deletadoEm: new Date(),
			idDaImagem: imagem.id,
			idDoUsuario: usuario.id,
		});
		expect(res).toBeInstanceOf(Imagem);
	});
	it('Quando for chamado, e o idDoUsuario corresponder a um usuario sem permissões, então deve disparar um erro', async () => {
		usuarioRepositorio.itens.push(usuario);
		usuario.props.cargo = TipoDeCargo.USUARIO;
		imagemRepositorio.itens.push(imagem);
		const sut = new DeletandoImagem(usuarioRepositorio, imagemRepositorio);
		try {
			await sut.executar({
				deletadoEm: new Date(),
				idDaImagem: imagem.id,
				idDoUsuario: usuario.id,
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Não authorizado.`, 400));
	});
	it('Quando for chamado, e o idDoUsuario não corresponder a um usuario valido, então deve disparar um erro', async () => {
		usuarioRepositorio.itens.push(usuario);
		imagemRepositorio.itens.push(imagem);
		const sut = new DeletandoImagem(usuarioRepositorio, imagemRepositorio);
		try {
			await sut.executar({
				deletadoEm: new Date(),
				idDaImagem: imagem.id,
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
		usuarioRepositorio.itens.push(usuario);
		imagemRepositorio.itens.push(imagem);
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
			usuarioRepositorio.itens.push(usuario);
			imagemRepositorio.itens.push(imagem);
			const sut = new DeletandoImagem(usuarioRepositorio, imagemRepositorio);
			if (idDaImagem) idDaImagem = imagem.id;
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
