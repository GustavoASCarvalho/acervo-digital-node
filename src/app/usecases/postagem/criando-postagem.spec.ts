import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
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
		const propriedadesDoUsuario: PropriedadesDoUsuario = {
			nome: 'Usuario',
			email: 'usuario@email.com',
			senha: 'senha',
			imagemDePerfil: 'https://www.postagem.com/image.png',
			cargo: CargosDoUsuarioEnum.USUARIO,
		};

		const usuario = Usuario.criar(propriedadesDoUsuario);

		usuarioRepositorio.items.push(usuario);

		const sut = new CriandoPostagem(usuarioRepositorio);
		const res = await sut.executar({
			descricao: 'descrição',
			idDoUsuario: usuario.id,
			texto: 'texto',
			titulo: 'titulo',
		});
		expect(res).toBeInstanceOf(Postagem);
	});
});
