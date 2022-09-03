import { Entidade } from '../../core/domain/Entidade';

export type PropriedadesDaTagEmImagensPostagens = {
	idDaPostagem?: string;
	idDoUsuario: string;
	idDaImagem?: string;
	idDaTag: string;
};

export class TagEmImagensPostagens extends Entidade<PropriedadesDaTagEmImagensPostagens> {
	private constructor(
		props: PropriedadesDaTagEmImagensPostagens,
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		super(props, id, criadoEm, atualizadoEm, deletadoEm);
	}

	static criar(
		props: PropriedadesDaTagEmImagensPostagens,
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		return new TagEmImagensPostagens(
			props,
			id,
			criadoEm,
			atualizadoEm,
			deletadoEm,
		);
	}
}
