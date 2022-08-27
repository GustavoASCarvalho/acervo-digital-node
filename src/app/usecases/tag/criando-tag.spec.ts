import { InMemoryUsuarioRepositorio } from '../../../../tests/repositories/in-memory-usuario-repositorio';
import { Tag } from '../../../domain/entities/tag';
import {
	CargosDoUsuarioEnum,
	PropriedadesDoUsuario,
	Usuario,
} from '../../../domain/entities/usuario';
import { CriandoTag } from './criando-tag';

describe('criando tag usecase', () => {
	it('deve criar uma tag com sucesso', async () => {
		const usuarioRepositorio = new InMemoryUsuarioRepositorio();
		const propriedadesDoUsuario: PropriedadesDoUsuario = {
			nome: 'Usuario',
			email: 'usuario@email.com',
			senha: 'senha',
			imagemDePerfil: 'https://www.tag.com/image.png',
			cargo: CargosDoUsuarioEnum.USUARIO,
		};

		const usuario = Usuario.criar(propriedadesDoUsuario);

		usuarioRepositorio.items.push(usuario);

		const sut = new CriandoTag(usuarioRepositorio);
		const res = await sut.executar({
			idDoUsuario: usuario.id,
			nome: 'Tag',
		});
		expect(res).toBeInstanceOf(Tag);
	});
});
