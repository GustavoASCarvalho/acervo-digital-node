import { prisma } from '../../../prisma';
import { AutenticacaoRepositorio } from '../AutenticacaoRepositorio';
import { CargosDoUsuarioEnum, Usuario } from '../../../domain/entities/usuario';
import { ApiError } from '../../../helpers/types/api-error';
import bcrypt from 'bcrypt';

export class PrismaAutenticacaoRepositorio implements AutenticacaoRepositorio {
	async autenticar(email: string, senha: string): Promise<Usuario> {
		const usuario = await prisma.usuario.findFirst({
			where: { email: email },
		});

		if (!usuario) {
			throw new ApiError('Email ou senha inválidos.', 401);
		}

		const verificacao = await bcrypt.compare(senha, usuario.senha);

		if (!verificacao) {
			throw new ApiError('Email ou senha inválidos.', 401);
		}

		return Usuario.criar(
			{
				nome: usuario.nome,
				email: usuario.email,
				senha: usuario.senha,
				imagemDePerfil: usuario.imagemDePerfil,
				cargo: usuario.cargo as CargosDoUsuarioEnum,
			},
			usuario.id,
			usuario.criadoEm,
			usuario.atualizadoEm,
			usuario.deletadoEm ?? undefined,
		);
	}
}
