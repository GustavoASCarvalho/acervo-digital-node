import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { Usuario } from '../../../domain/entities/usuario';
import { ApiError } from '../../../helpers/types/api-error';
import { CriandoUsuario } from './criando-usuario';

describe('Criando usuario usecase', () => {
	let erro: unknown;
	it('Quando for chamado, e os dados forem passado corretamente, então o usuario deve ser criado com sucesso', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const sut = new CriandoUsuario(usuarioRepositorio);
		const res = await sut.executar({
			nome: 'Usuario',
			email: 'usuario@email.com',
			imagemDePerfil: 'https://www.usuario.com/image.png',
			senha: 'senha',
			atualizadoEm: new Date(),
			criadoEm: new Date(),
		});
		expect(res).toBeInstanceOf(Usuario);
	});
	it('Quando for chamado, e o email não for válido, então deve disparar um erro', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const sut = new CriandoUsuario(usuarioRepositorio);

		try {
			await sut.executar({
				nome: 'Usuario',
				email: '.usuario@email.com',
				imagemDePerfil: 'https://www.usuario.com/image.png',
				senha: 'senha',
				atualizadoEm: new Date(),
				criadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Campo 'email' invalido`, 400));
	});
	it('Quando for chamado, e a imagemDePerfil não for válida, então deve disparar um erro', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const sut = new CriandoUsuario(usuarioRepositorio);

		try {
			await sut.executar({
				nome: 'Usuario',
				email: 'usuario@email.com',
				imagemDePerfil: 'data:image/png;base64,iVBORw0KGgoAAAANSU',
				senha: 'senha',
				atualizadoEm: new Date(),
				criadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Campo 'imagemDePerfil' invalido`, 400));
	});
	test.each`
		nome      | email                | senha      | imagemDePerfil | criadoEm      | atualizadoEm  | esperado
		${null}   | ${'email@gmail.com'} | ${'senha'} | ${'http://'}   | ${new Date()} | ${new Date()} | ${'nome'}
		${'nome'} | ${null}              | ${'senha'} | ${'http://'}   | ${new Date()} | ${new Date()} | ${'email'}
		${'nome'} | ${'email@gmail.com'} | ${null}    | ${'http://'}   | ${new Date()} | ${new Date()} | ${'senha'}
		${'nome'} | ${'email@gmail.com'} | ${'senha'} | ${null}        | ${new Date()} | ${new Date()} | ${'imagemDePerfil'}
		${'nome'} | ${'email@gmail.com'} | ${'senha'} | ${'http://'}   | ${null}       | ${new Date()} | ${'criadoEm'}
		${'nome'} | ${'email@gmail.com'} | ${'senha'} | ${'http://'}   | ${new Date()} | ${null}       | ${'atualizadoEm'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({
			nome,
			email,
			senha,
			imagemDePerfil,
			criadoEm,
			atualizadoEm,
			esperado,
		}) => {
			const usuarioRepositorio = new InMemoryUsuarioRepositorio();
			const sut = new CriandoUsuario(usuarioRepositorio);
			try {
				await sut.executar({
					nome: nome,
					email: email,
					imagemDePerfil: imagemDePerfil,
					senha: senha,
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
