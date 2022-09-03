import { prisma } from '../../../prisma';
import { AutenticacaoRepositorio } from '../AutenticacaoRepositorio';
import { TipoDeCargo, Usuario } from '../../../domain/entities/usuario';
import { ApiError } from '../../../helpers/types/api-error';
import bcrypt from 'bcrypt';
import { usuarios } from '@prisma/client';

export class PrismaAutenticacaoRepositorio implements AutenticacaoRepositorio {
	async autenticar(email: string, senha: string): Promise<Usuario> {
		const usuario = await prisma.usuarios.findFirst({
			where: { email: email },
		});

		if (!usuario) {
			throw new ApiError('Email ou senha inválidos.', 401);
		}

		const verificacao = await bcrypt.compare(senha, usuario.senha);

		if (!verificacao) {
			throw new ApiError('Email ou senha inválidos.', 401);
		}

		return this.formatarUsuario(usuario);
	}

	private formatarUsuario(usuario: usuarios): Usuario {
		return Usuario.criar(
			{
				nome: usuario.nome,
				email: usuario.email,
				senha: usuario.senha,
				imagemDePerfil: usuario.imagem_de_perfil,
				cargo: usuario.cargo as TipoDeCargo,
			},
			usuario.id,
			usuario.criado_em,
			usuario.atualizado_em,
			usuario.deletado_em ?? undefined,
		);
	}
}
