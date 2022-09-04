import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { Imagem } from '../../../domain/entities/imagem';
import {
	TipoDeCargo,
	PropriedadesDoUsuario,
	Usuario,
} from '../../../domain/entities/usuario';
import { CriandoImagem } from './criando-imagem';
import { ApiError } from '../../../helpers/types/api-error';

describe('Criando imagem usecase', () => {
	let usuarioRepositorio: InMemoryUsuarioRepositorio;
	let imagemRepositorio: InMemoryImagemRepositorio;
	let usuario: Usuario;
	let erro: unknown;
	beforeEach(() => {
		usuarioRepositorio = new InMemoryUsuarioRepositorio();
		imagemRepositorio = new InMemoryImagemRepositorio();
		const propriedadesDoUsuario: PropriedadesDoUsuario = {
			nome: 'Usuario',
			email: 'usuario@email.com',
			senha: 'senha',
			imagemDePerfil: 'https://www.imagem.com/image.png',
			cargo: TipoDeCargo.USUARIO,
		};
		usuario = Usuario.criar(propriedadesDoUsuario, new Date(), new Date());
	});
	it('Quando for chamado, e os dados forem passado corretamente, então a imagem deve ser criada com sucesso', async () => {
		usuarioRepositorio.items.push(usuario);
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
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(`Usuario 'Id inexistente' não encontrado.`, 404),
		);
	});
	it('Quando for chamado, e o nome for maior que 254 caracteres, então deve disparar um erro', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const imagemRepositorio = new InMemoryImagemRepositorio();
		const sut = new CriandoImagem(usuarioRepositorio, imagemRepositorio);

		let erro;
		try {
			await sut.executar({
				data: new Date('26-05-2003'),
				endereco: 'Rua dos gatos',
				idDoUsuario: 'Id inexistente',
				nome: `a`.repeat(255),
				latitude: '34',
				longitude: '-122',
				criadoEm: new Date(),
				atualizadoEm: new Date(),
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Campo 'nome' invalido.`, 400));
	});

	test.each`
		data            | endereco     | idDoUsuario | nome      | latitude | longitude | criadoEm      | atualizadoEm  | esperado
		${null}         | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${'data'}
		${'01-02-2003'} | ${null}      | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${'endereco'}
		${'01-02-2003'} | ${'Rua tal'} | ${null}     | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${'idDoUsuario'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${null}   | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${'nome'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${null}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${'latitude'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${null}   | ${new Date()} | ${new Date()} | ${'longitude'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${null}       | ${new Date()} | ${'criadoEm'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${null}       | ${'atualizadoEm'}
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
		}) => {
			const sut = new CriandoImagem(usuarioRepositorio, imagemRepositorio);
			usuarioRepositorio.items.push(usuario);
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
