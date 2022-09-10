import { AutenticacaoRepositorio } from '../../src/app/repositories/AutenticacaoRepositorio';
import { Usuario } from '../../src/domain/entities/usuario';
import { ApiError } from '../../src/helpers/types/api-error';
import { usuarios } from '../usuario-memory';

export class InMemoryUsuarioAutenticacaoRepositorio
	implements AutenticacaoRepositorio
{
	public itens: Usuario[] = usuarios;
	async autenticar(email: string, senha: string): Promise<Usuario> {
		const usuario = this.itens.find(item => item.props.email === email);

		if (!usuario) {
			throw new ApiError('Email ou senha inválidos.', 401);
		}

		if (usuario.props.senha !== senha) {
			throw new ApiError('Email ou senha inválidos.', 401);
		}

		return usuario;
	}
}
