import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { Usuario } from '../../../domain/entities/usuario';
import { CriandoUsuario } from './criando-usuario';

describe('criando usuario usecase', () => {
	it('deve criar uma usuario com sucesso', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const sut = new CriandoUsuario(usuarioRepositorio);
		const res = await sut.executar({
			nome: 'Usuario',
			email: 'usuario@email.com',
			imagemDePerfil: 'https://www.usuario.com/image.png',
			senha: 'senha',
		});
		expect(res).toBeInstanceOf(Usuario);
	});
});
