import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { usuario } from '../../../../tests/usuario-memory';
import { TipoDeCargo, Usuario } from '../../../domain/entities/usuario';
import { ApiError } from '../../../helpers/types/api-error';
import { AtualizandoUsuario } from './atualizando-usuario';

describe('Atualizando usuario usecase', () => {
	let erro: unknown;
	it('Quando for chamado, e os dados forem passado corretamente, então o usuario deve ser criado com sucesso', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const sut = new AtualizandoUsuario(usuarioRepositorio);
		const res = await sut.executar({
			id: usuario.id,
			idDoUsuario: usuario.id,
			nome: 'Usuario',
			email: 'usuario@email.com',
			imagemDePerfil: 'https://www.usuario.com/image.png',
			senha: 'senha',
			cargo: TipoDeCargo.USUARIO,
			atualizadoEm: new Date(),
			criadoEm: new Date(),
		});
		expect(res).toBeInstanceOf(Usuario);
	});
	it('Quando for chamado, e o email não for válido, então deve disparar um erro', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const sut = new AtualizandoUsuario(usuarioRepositorio);

		try {
			await sut.executar({
				id: usuario.id,
				idDoUsuario: usuario.id,
				nome: 'Usuario',
				email: '...usuario@email.com',
				imagemDePerfil: 'https://www.usuario.com/image.png',
				senha: 'senha',
				cargo: TipoDeCargo.USUARIO,
				atualizadoEm: new Date(),
				criadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Campo 'email' invalido`, 400));
	});
	it('Quando for chamado, e o usuario atualizou o campo de cargo, porém ele não é um adiministrador, então deve disparar um erro', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const sut = new AtualizandoUsuario(usuarioRepositorio);

		try {
			await sut.executar({
				id: usuario.id,
				idDoUsuario: usuario.id,
				nome: 'Usuario',
				email: 'usuario@email.com',
				imagemDePerfil: 'https://www.usuario.com/image.png',
				senha: 'senha',
				cargo: TipoDeCargo.MODERADOR,
				atualizadoEm: new Date(),
				criadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Não autorizado.`, 401));
	});
	it('Quando for chamado, e o idDoUsuario não corresponder a um usuario, então deve disparar um erro', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const sut = new AtualizandoUsuario(usuarioRepositorio);

		try {
			await sut.executar({
				id: usuario.id,
				idDoUsuario: 'Id inexistente',
				nome: 'Usuario',
				email: 'usuario@email.com',
				imagemDePerfil: 'https://www.usuario.com/image.png',
				senha: 'senha',
				cargo: TipoDeCargo.USUARIO,
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
	it('Quando for chamado, e a imagemDePerfil não for válida, então deve disparar um erro', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const sut = new AtualizandoUsuario(usuarioRepositorio);

		try {
			await sut.executar({
				id: usuario.id,
				idDoUsuario: usuario.id,
				nome: 'Usuario',
				email: 'usuario@email.com',
				imagemDePerfil: 'data://',
				senha: 'senha',
				cargo: TipoDeCargo.USUARIO,
				atualizadoEm: new Date(),
				criadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Campo 'imagemDePerfil' invalido`, 400));
	});
	test.each`
		id      | nome      | email                | senha      | imagemDePerfil | criadoEm      | atualizadoEm  | cargo                  | idDoUsuario | esperado
		${null} | ${'nome'} | ${'email@gmail.com'} | ${'senha'} | ${'http://'}   | ${new Date()} | ${new Date()} | ${TipoDeCargo.USUARIO} | ${'2'}      | ${'id'}
		${'2'}  | ${null}   | ${'email@gmail.com'} | ${'senha'} | ${'http://'}   | ${new Date()} | ${new Date()} | ${TipoDeCargo.USUARIO} | ${'2'}      | ${'nome'}
		${'2'}  | ${'nome'} | ${null}              | ${'senha'} | ${'http://'}   | ${new Date()} | ${new Date()} | ${TipoDeCargo.USUARIO} | ${'2'}      | ${'email'}
		${'2'}  | ${'nome'} | ${'email@gmail.com'} | ${null}    | ${'http://'}   | ${new Date()} | ${new Date()} | ${TipoDeCargo.USUARIO} | ${'2'}      | ${'senha'}
		${'2'}  | ${'nome'} | ${'email@gmail.com'} | ${'senha'} | ${null}        | ${new Date()} | ${new Date()} | ${TipoDeCargo.USUARIO} | ${'2'}      | ${'imagemDePerfil'}
		${'2'}  | ${'nome'} | ${'email@gmail.com'} | ${'senha'} | ${'http://'}   | ${null}       | ${new Date()} | ${TipoDeCargo.USUARIO} | ${'2'}      | ${'criadoEm'}
		${'2'}  | ${'nome'} | ${'email@gmail.com'} | ${'senha'} | ${'http://'}   | ${new Date()} | ${null}       | ${TipoDeCargo.USUARIO} | ${'2'}      | ${'atualizadoEm'}
		${'2'}  | ${'nome'} | ${'email@gmail.com'} | ${'senha'} | ${'http://'}   | ${new Date()} | ${new Date()} | ${null}                | ${'2'}      | ${'cargo'}
		${'2'}  | ${'nome'} | ${'email@gmail.com'} | ${'senha'} | ${'http://'}   | ${new Date()} | ${new Date()} | ${TipoDeCargo.USUARIO} | ${null}     | ${'idDoUsuario'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({
			id,
			nome,
			email,
			senha,
			imagemDePerfil,
			criadoEm,
			atualizadoEm,
			cargo,
			idDoUsuario,
			esperado,
		}) => {
			const usuarioRepositorio = new InMemoryUsuarioRepositorio();
			const sut = new AtualizandoUsuario(usuarioRepositorio);
			try {
				await sut.executar({
					id: id ? usuario.id : id,
					idDoUsuario: idDoUsuario ? usuario.id : idDoUsuario,
					nome: nome,
					email: email,
					imagemDePerfil: imagemDePerfil,
					senha: senha,
					cargo: cargo,
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
