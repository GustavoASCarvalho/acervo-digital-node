import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { InMemoryPostagemRepositorio } from '../../../../tests/repositories/in-memory-postagem-repositorio';
import { Postagem } from '../../../domain/entities/postagem';
import {
	CargosDoUsuarioEnum,
	PropriedadesDoUsuario,
	Usuario,
} from '../../../domain/entities/usuario';
import { CriandoPostagem } from './criando-postagem';

describe('criando postagem usecase', () => {
	it('deve criar uma postagem com sucesso', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const postagemRepositorio = new InMemoryPostagemRepositorio();
		const propriedadesDoUsuario: PropriedadesDoUsuario = {
			nome: 'Usuario',
			email: 'usuario@email.com',
			senha: 'senha',
			imagemDePerfil: 'https://www.postagem.com/image.png',
			cargo: CargosDoUsuarioEnum.USUARIO,
		};

		const usuario = Usuario.criar(propriedadesDoUsuario);

		usuarioRepositorio.items.push(usuario);

		const sut = new CriandoPostagem(usuarioRepositorio, postagemRepositorio);
		const res = await sut.executar({
			descricao: 'descrição',
			idDoUsuario: usuario.id,
			texto: 'texto',
			titulo: 'titulo',
		});
		expect(res).toBeInstanceOf(Postagem);
	});
	it('deve disparar um novo erro ao criar uma postagem sem usuario vinculado', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const postagemRepositorio = new InMemoryPostagemRepositorio();
		const sut = new CriandoPostagem(usuarioRepositorio, postagemRepositorio);

		try {
			await sut.executar({
				descricao: 'descrição',
				idDoUsuario: 'idDoUsuario inexistente',
				texto: 'texto',
				titulo: 'titulo',
			});
		} catch (err) {
			expect(err).toBeInstanceOf(Error);
		}
	});
});
