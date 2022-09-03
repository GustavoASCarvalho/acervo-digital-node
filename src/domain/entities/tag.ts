import { Entidade } from '../../core/domain/Entidade';

export type PropriedadesDaTag = {
	nome: string;
	idDoUsuario: string;
};

export class Tag extends Entidade<PropriedadesDaTag> {
	private constructor(
		props: PropriedadesDaTag,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		super(props, criadoEm, atualizadoEm, id, deletadoEm);
	}

	static criar(
		props: PropriedadesDaTag,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		return new Tag(props, criadoEm, atualizadoEm, id, deletadoEm);
	}
}
