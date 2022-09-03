import { Imagem } from '../../../domain/entities/imagem';
import { CargosDoUsuarioEnum } from '../../../domain/entities/usuario';
import { ApiError } from '../../../helpers/types/api-error';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type DeletandoImagemRequisicao = {
	idDaImagem: string;
	idDoUsuario: string;
	deletadoEm: string;
};

export class DeletandoImagem {
	constructor(
		private usuarioRepositorio: UsuarioRepositorio,
		private imagemRepositorio: ImagemRepositorio,
	) {}

	async executar({
		idDaImagem,
		idDoUsuario,
		deletadoEm,
	}: DeletandoImagemRequisicao) {
		await validacaoDaRequisicao(
			{ idDaImagem, idDoUsuario, deletadoEm },
			this.imagemRepositorio,
			this.usuarioRepositorio,
		);

		const imagem = await this.imagemRepositorio.delete(
			idDaImagem,
			idDoUsuario,
			deletadoEm,
		);

		return imagem;
	}
}

async function validacaoDaRequisicao(
	{ idDaImagem, idDoUsuario, deletadoEm }: DeletandoImagemRequisicao,
	imagemRepositorio: ImagemRepositorio,
	usuarioRepositorio: UsuarioRepositorio,
) {
	if (!deletadoEm) {
		throw new ApiError(`Campo 'deletadoEm' ausente na requisição.`, 400);
	}
	if (!idDoUsuario) {
		throw new ApiError(`Campo 'idDoUsuario' ausente na requisição.`, 400);
	}
	const usuario = await usuarioRepositorio.findById(idDoUsuario);
	if (!usuario) {
		throw new ApiError(`Usuario '${idDoUsuario}' não encontrado.`, 404);
	}
	const imagem = await imagemRepositorio.findById(idDaImagem);
	if (!imagem) {
		throw new ApiError(`Imagem '${idDaImagem}' não encontrada.`, 404);
	}
	if (
		imagem.props.idDoUsuario !== idDoUsuario ||
		usuario.props.cargo === CargosDoUsuarioEnum.USUARIO
	) {
		throw new ApiError(`Não authorizado`, 400);
	}
}
