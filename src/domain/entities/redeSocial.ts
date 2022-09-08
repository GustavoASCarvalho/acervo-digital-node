import { Entidade } from '../../core/domain/Entidade';

export type PropriedadesDaRedeSocial = {
	nome: string;
	url: string;
};

export class RedeSocial extends Entidade<PropriedadesDaRedeSocial> {
	private constructor(
		props: PropriedadesDaRedeSocial,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		super(props, criadoEm, atualizadoEm, id, deletadoEm);
	}

	static criar(
		props: PropriedadesDaRedeSocial,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		return new RedeSocial(props, criadoEm, atualizadoEm, id, deletadoEm);
	}
}
