import { prisma } from '../../../prisma';
import { CargosDoUsuarioEnum, Usuario } from '../../../domain/entities/usuario';
import { UsuarioRepositorio } from '../UsuarioRepositorio';
import { Imagem } from '../../../domain/entities/imagem';

export class PrismaUsuarioRepositorio implements UsuarioRepositorio {
	async findById(id: string): Promise<Usuario | null> {
		const usuario = await prisma.usuario.findFirst({
			where: { id: id },
		});

		if (!usuario) return null;

		return Usuario.criar(
			{
				nome: usuario.nome,
				email: usuario.email,
				senha: usuario.senha,
				imagemDePerfil: usuario.imagemDePerfil,
				cargo: usuario.cargo as CargosDoUsuarioEnum,
			},
			id,
			usuario.criadoEm,
			usuario.atualizadoEm,
			usuario.deletadoEm ?? undefined,
		);
	}

	async create(data: Usuario): Promise<Usuario> {
		const usuario = await prisma.usuario.create({
			data: {
				id: data.id,
				nome: data.props.nome,
				email: data.props.email,
				senha: data.props.senha,
				imagemDePerfil: data.props.imagemDePerfil,
				cargo: data.props.cargo,
				atualizadoEm: data.atualizadoEm,
				criadoEm: data.criadoEm,
				deletadoEm: data.deletadoEm,
			},
		});

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
