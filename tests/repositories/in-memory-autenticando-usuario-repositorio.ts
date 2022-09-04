import { AutenticacaoRepositorio } from '../../src/app/repositories/AutenticacaoRepositorio';
import { TipoDeCargo, Usuario } from '../../src/domain/entities/usuario';
import { ApiError } from '../../src/helpers/types/api-error';

export class InMemoryUsuarioAutenticacaoRepositorio
	implements AutenticacaoRepositorio
{
	public itens: Usuario[] = [
		Usuario.criar(
			{
				nome: 'nome',
				email: 'email@gmail.com',
				senha: 'senha',
				imagemDePerfil: 'http://imagem',
				cargo: TipoDeCargo.USUARIO,
			},
			new Date(),
			new Date(),
			'1',
		),
	];
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
