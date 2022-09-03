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
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		super(props, criadoEm, atualizadoEm, id, deletadoEm);
	}

	static criar(
		props: PropriedadesDaTagEmImagensPostagens,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		return new TagEmImagensPostagens(
			props,
			criadoEm,
			atualizadoEm,
			id,
			deletadoEm,
		);
	}
}
