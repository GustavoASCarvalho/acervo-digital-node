import { Imagem } from '../../../domain/entities/imagem';
import { ImagemRepositorio } from '../../repositories/ImagemRepositorio';
import { UsuarioRepositorio } from '../../repositories/UsuarioRepositorio';

export type CriandoImagemRequisicao = {
	nome: string;
	data: string;
	endereco: string;
	idDoUsuario: string;
};

export class CriandoImagem {
	constructor(
		private usuarioRepositorio: UsuarioRepositorio,
		private imagemRepositorio: ImagemRepositorio,
	) {}

	async executar({
		nome,
		data,
		endereco,
		idDoUsuario,
	}: CriandoImagemRequisicao) {
		const usuario = await this.usuarioRepositorio.findById(idDoUsuario);

		if (!usuario) {
			throw new Error("{code: 404, message: 'Usuario inexistente'}");
		}

		const imagem = Imagem.criar({
			nome,
			data,
			endereco,
			idDoUsuario,
			latitude: '-232',
			longitude: '-232',
			url: 'http://',
			visualizacoes: 0,
		});

		await this.imagemRepositorio.create(imagem);

		return imagem;
	}
}
