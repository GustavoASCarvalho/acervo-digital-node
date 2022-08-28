import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryImagemRepositorio } from '../../../../tests/repositories/in-memory-imagem-repositorio';
import { Imagem } from '../../../domain/entities/imagem';
import {
	CargosDoUsuarioEnum,
	PropriedadesDoUsuario,
	Usuario,
} from '../../../domain/entities/usuario';
import { CriandoImagem } from './criando-imagem';

describe('criando imagem usecase', () => {
	it('deve criar uma imagem com sucesso', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const imagemRepositorio = new InMemoryImagemRepositorio();
		const propriedadesDoUsuario: PropriedadesDoUsuario = {
			nome: 'Usuario',
			email: 'usuario@email.com',
			senha: 'senha',
			imagemDePerfil: 'https://www.imagem.com/image.png',
			cargo: CargosDoUsuarioEnum.USUARIO,
		};

		const usuario = Usuario.criar(propriedadesDoUsuario);

		usuarioRepositorio.items.push(usuario);

		const sut = new CriandoImagem(usuarioRepositorio, imagemRepositorio);
		const res = await sut.executar({
			data: '26/05/2003',
			endereco: 'Rua dos gatos',
			idDoUsuario: usuario.id,
			nome: 'Imagem de um gato',
			latitude: '34',
			longitude: '-122',
		});
		expect(res).toBeInstanceOf(Imagem);
	});
	it('deve disparar um novo erro ao criar uma imagem sem usuario vinculado', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const imagemRepositorio = new InMemoryImagemRepositorio();
		const sut = new CriandoImagem(usuarioRepositorio, imagemRepositorio);

		try {
			await sut.executar({
				data: '26/05/2003',
				endereco: 'Rua dos gatos',
				idDoUsuario: 'idDoUsuario inexistente',
				nome: 'Imagem de um gato',
				latitude: '34',
				longitude: '-122',
			});
		} catch (err) {
			expect(err).toBeInstanceOf(Error);
		}
	});
});
