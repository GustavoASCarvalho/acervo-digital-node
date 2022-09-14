import jwt from 'jsonwebtoken';
import { InMemoryUsuarioAutenticacaoRepositorio } from '../../../../tests/repositories/in-memory-autenticando-usuario-repositorio';
import { usuario } from '../../../../tests/usuario-memory';
import { ApiError } from '../../../helpers/types/api-error';
import { AutenticandoUsuario } from './autenticando-usuario';

describe('Criando usuario usecase', () => {
	let erro: unknown;
	const autenticacaoRepositorio = new InMemoryUsuarioAutenticacaoRepositorio();
	const sut = new AutenticandoUsuario(autenticacaoRepositorio);

	const OLD_ENV = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...OLD_ENV };
		process.env.JWT_PASS = 'qualquer';
	});

	afterAll(() => {
		process.env = OLD_ENV;
	});

	it('Quando for chamado, e os dados forem passado corretamente, então o usuario deve ser criado com sucesso', async () => {
		const res = await sut.executar({
			email: usuario.props.email,
			senha: usuario.props.senha,
		});
		expect(res).toBe(
			jwt.sign(
				{
					id: usuario.id,
				},
				process.env.JWT_PASS!,
				{ expiresIn: '8h' },
			),
		);
	});
	it('Quando for chamado, porém nenhum usuario for encontrado com o email passado, então deve disparar um erro', async () => {
		try {
			await sut.executar({
				email: 'goku62@edu.com.br',
				senha: 'senha',
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError('Email ou senha inválidos.', 401));
	});
	it('Quando for chamado, e a senha não corresponder ao email, então deve disparar um erro', async () => {
		try {
			await sut.executar({
				email: usuario.props.email,
				senha: 'minha senha invalida',
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError('Email ou senha inválidos.', 401));
	});
	it('Quando for chamado, e o email não for válido, então deve disparar um erro', async () => {
		try {
			await sut.executar({
				email: '.email@gmail.com',
				senha: 'senha',
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Campo 'email' invalido`, 400));
	});
	test.each`
		email                | senha      | esperado
		${null}              | ${'senha'} | ${'email'}
		${'email@gmail.com'} | ${null}    | ${'senha'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({ email, senha, esperado }) => {
			try {
				await sut.executar({
					email: email,
					senha: senha,
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
