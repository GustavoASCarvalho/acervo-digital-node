import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { InMemoryStorageProvider } from '../../../../tests/repositories/in-memory-storage-provider';
import { Imagem } from '../../../domain/entities/imagem';
import { CriandoImagem } from './criando-imagem';
import { ApiError } from '../../../helpers/types/api-error';
import { usuario } from '../../../../tests/usuario-memory';
import { Readable } from 'stream';

describe('Criando imagem usecase', () => {
	let usuarioRepositorio: InMemoryUsuarioRepositorio;
	let imagemRepositorio: InMemoryImagemRepositorio;
	let storageRepositorio: InMemoryStorageProvider;
	let erro: unknown;
	const file = {
		fieldname: 'file',
		originalname: 'certificado.png',
		encoding: '7bit',
		mimetype: 'image/png',
		destination: '',
		filename: 'b91036911715c2fb866d-certificado.png',
		path: 'b91036911715c2fb866d-certificado.png',
		size: 29237,
		stream: null as unknown as Readable,
		buffer: null as unknown as Buffer,
	};
	beforeEach(() => {
		usuarioRepositorio = new InMemoryUsuarioRepositorio();
		imagemRepositorio = new InMemoryImagemRepositorio();
		storageRepositorio = new InMemoryStorageProvider();
	});
	it('Quando for chamado, e os dados forem passado corretamente, então a imagem deve ser criada com sucesso', async () => {
		const sut = new CriandoImagem(
			usuarioRepositorio,
			imagemRepositorio,
			storageRepositorio,
		);
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
			file,
		});
		expect(res).toBeInstanceOf(Imagem);
	});
	it('Quando for chamado, e o idDoUsuario não corresponder a um usuario valido, então deve disparar um erro', async () => {
		const sut = new CriandoImagem(
			usuarioRepositorio,
			imagemRepositorio,
			storageRepositorio,
		);
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
				file,
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(
			new ApiError(`Usuario 'Id inexistente' não encontrado.`, 404),
		);
	});
	it('Quando for chamado, e o usuario tiver o cargo de usuario e a sugestão for false, então deve disparar um erro', async () => {
		const sut = new CriandoImagem(
			usuarioRepositorio,
			imagemRepositorio,
			storageRepositorio,
		);
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
				file,
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Não autorizado.`, 401));
	});
	it(`Quando for chamado, e o arquivo não for do tipo esperado, então deve disparar um erro`, async () => {
		const sut = new CriandoImagem(
			usuarioRepositorio,
			imagemRepositorio,
			storageRepositorio,
		);
		const fileWithWrongType = { ...file, mimetype: 'application/pdf' };
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
				eSugestao: true,
				file: fileWithWrongType,
			});
		} catch (err) {
			erro = err;
		}
		expect(erro).toEqual(new ApiError(`Formato de arquivo inválido.`, 400));
	});

	test.each`
		data            | endereco     | idDoUsuario | nome      | latitude | longitude | criadoEm      | atualizadoEm  | eSugestao | file    | esperado
		${null}         | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${file} | ${'data'}
		${'01-02-2003'} | ${null}      | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${file} | ${'endereco'}
		${'01-02-2003'} | ${'Rua tal'} | ${null}     | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${file} | ${'idDoUsuario'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${null}   | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${file} | ${'nome'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${null}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${file} | ${'latitude'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${null}   | ${new Date()} | ${new Date()} | ${true}   | ${file} | ${'longitude'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${null}       | ${new Date()} | ${true}   | ${file} | ${'criadoEm'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${null}       | ${true}   | ${file} | ${'atualizadoEm'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${null}   | ${file} | ${'eSugestao'}
		${'01-02-2003'} | ${'Rua tal'} | ${'2'}      | ${'Nome'} | ${'-1'}  | ${'-2'}   | ${new Date()} | ${new Date()} | ${true}   | ${null} | ${'eSugestao'}
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
			const sut = new CriandoImagem(
				usuarioRepositorio,
				imagemRepositorio,
				storageRepositorio,
			);

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
					file,
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
