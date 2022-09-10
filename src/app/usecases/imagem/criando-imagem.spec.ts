import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { Imagem } from '../../../domain/entities/imagem';
import { CriandoImagem } from './criando-imagem';
import { ApiError } from '../../../helpers/types/api-error';
import { usuario } from '../../../../tests/usuario-memory';

describe('Criando imagem usecase', () => {
	let usuarioRepositorio: InMemoryUsuarioRepositorio;
	let imagemRepositorio: InMemoryImagemRepositorio;
	let erro: unknown;
	beforeEach(() => {
		usuarioRepositorio = new InMemoryUsuarioRepositorio();
		imagemRepositorio = new InMemoryImagemRepositorio();
	});
	it('Quando for chamado, e os dados forem passado corretamente, então a imagem deve ser criada com sucesso', async () => {
		const sut = new CriandoImagem(usuarioRepositorio, imagemRepositorio);
		const res = await sut.executar({
			data: new Date('26-05-2003'),
			endereco: 'Rua dos gatos',
			idDoUsuario: usuario.id,
			nome: 'Imagem de um gato',
			latitude: '34',
			longitude: '-122',
			criadoEm: new Date(),
			atualizadoEm: new Date(),
			eSugestao: true,
		});
		expect(res).toBeInstanceOf(Imagem);
	});
	it('Quando for chamado, e o idDoUsuario não corresponder a um usuario valido, então deve disparar um erro', async () => {
		const sut = new CriandoImagem(usuarioRepositorio, imagemRepositorio);
		try {
			await sut.executar({
				data: new Date('26-05-2003'),
				endereco: 'Rua dos gatos',
				idDoUsuario: 'Id inexistente',
				nome: 'Imagem de um gato',
				latitude: '34',
				longitude: '-122',
				criadoEm: new Date(),
				atualizadoEm: new Date(),
				eSugestao: false,
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(`Usuario 'Id inexistente' não encontrado.`, 404),
		);
	});
	it('Quando for chamado, e o usuario tiver o cargo de usuario e a sugestão for false, então deve disparar um erro', async () => {
		const sut = new CriandoImagem(usuarioRepositorio, imagemRepositorio);
		try {
			await sut.executar({
				data: new Date('26-05-2003'),
				endereco: 'Rua dos gatos',
				idDoUsuario: usuario.id,
				nome: 'Imagem de um gato',
				latitude: '34',
				longitude: '-122',
				criadoEm: new Date(),
				atualizadoEm: new Date(),
				eSugestao: false,
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Não autorizado.`, 401));
	});

	test.each`
		data            | endereco     | idDoUsuario | nome      | latitude | longitude | criadoEm      | atualizadoEm  | eSugestao | esperado
		${null}         | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${'data'}
		${'01-02-2003'} | ${null}      | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${'endereco'}
		${'01-02-2003'} | ${'Rua tal'} | ${null}     | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${'idDoUsuario'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${null}   | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${'nome'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${null}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${'latitude'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${null}   | ${new Date()} | ${new Date()} | ${true}   | ${'longitude'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${null}       | ${new Date()} | ${true}   | ${'criadoEm'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${null}       | ${true}   | ${'atualizadoEm'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${null}   | ${'eSugestao'}
	`(
		'Quando for chamado, e o campo $esperado for nulo, então deve disparar um erro',
		async ({
			data,
			endereco,
			idDoUsuario,
			nome,
			latitude,
			longitude,
			criadoEm,
			atualizadoEm,
			esperado,
			eSugestao,
		}) => {
			const sut = new CriandoImagem(usuarioRepositorio, imagemRepositorio);

			try {
				await sut.executar({
					data: data,
					endereco: endereco,
					idDoUsuario: idDoUsuario ? usuario.id : idDoUsuario,
					nome: nome,
					latitude: latitude,
					longitude: longitude,
					criadoEm: criadoEm,
					atualizadoEm: atualizadoEm,
					eSugestao: eSugestao,
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
