import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { Imagem } from '../../../domain/entities/imagem';
import { ApiError } from '../../../helpers/types/api-error';
import { moderador, usuario } from '../../../../tests/usuario-memory';
import { AtualizandoImagem } from './atualizando-imagem';
import { usuario_imagem } from '../../../../tests/imagem-memory';

describe('Atualziando imagem usecase', () => {
	let usuarioRepositorio: InMemoryUsuarioRepositorio;
	let imagemRepositorio: InMemoryImagemRepositorio;
	let erro: unknown;
	beforeEach(() => {
		usuarioRepositorio = new InMemoryUsuarioRepositorio();
		imagemRepositorio = new InMemoryImagemRepositorio();
	});
	it('Quando for chamado, e os dados forem passado corretamente, então a imagem deve ser atualizada com sucesso', async () => {
		const sut = new AtualizandoImagem(usuarioRepositorio, imagemRepositorio);
		const res = await sut.executar({
			id: usuario_imagem.id,
			data: new Date('26-05-2003'),
			endereco: 'Rua dos gatos',
			idDoUsuario: moderador.id,
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
		const sut = new AtualizandoImagem(usuarioRepositorio, imagemRepositorio);
		try {
			await sut.executar({
				id: usuario_imagem.id,
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
		const sut = new AtualizandoImagem(usuarioRepositorio, imagemRepositorio);
		try {
			await sut.executar({
				id: usuario_imagem.id,
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
		data            | endereco     | idDoUsuario | nome      | latitude | longitude | criadoEm      | atualizadoEm  | eSugestao | id      | esperado
		${null}         | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${'2'}  | ${'data'}
		${'01-02-2003'} | ${null}      | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${'2'}  | ${'endereco'}
		${'01-02-2003'} | ${'Rua tal'} | ${null}     | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${'2'}  | ${'idDoUsuario'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${null}   | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${'2'}  | ${'nome'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${null}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${'2'}  | ${'latitude'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${null}   | ${new Date()} | ${new Date()} | ${true}   | ${'2'}  | ${'longitude'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${null}       | ${new Date()} | ${true}   | ${'2'}  | ${'criadoEm'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${null}       | ${true}   | ${'2'}  | ${'atualizadoEm'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${null}   | ${'2'}  | ${'eSugestao'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${null} | ${'id'}
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
			id,
		}) => {
			const sut = new AtualizandoImagem(usuarioRepositorio, imagemRepositorio);

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
					id: id ? usuario_imagem.id : id,
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
