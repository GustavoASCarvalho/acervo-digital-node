import { Entidade } from '../../core/domain/Entidade';

export type PropriedadesDaImagensEmPostagem = {
	idDaPostagem: string;
	idDaImagem: string;
	idDoUsuario: string;
};

export class ImagensEmPostagem extends Entidade<PropriedadesDaImagensEmPostagem> {
	private constructor(
		props: PropriedadesDaImagensEmPostagem,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		super(props, criadoEm, atualizadoEm, id, deletadoEm);
	}

	static criar(
		props: PropriedadesDaImagensEmPostagem,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		return new ImagensEmPostagem(props, criadoEm, atualizadoEm, id, deletadoEm);
	}
}
