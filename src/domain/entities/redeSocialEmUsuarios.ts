import { Entidade } from '../../core/domain/Entidade';

export type PropriedadesDaRedeSocialEmUsuario = {
	idDaRedeSocial: string;
	idDoUsuario: string;
	nomeUsuario: string;
};

export class RedeSocialEmUsuario extends Entidade<PropriedadesDaRedeSocialEmUsuario> {
	private constructor(
		props: PropriedadesDaRedeSocialEmUsuario,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		super(props, criadoEm, atualizadoEm, id, deletadoEm);
	}

	static criar(
		props: PropriedadesDaRedeSocialEmUsuario,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		return new RedeSocialEmUsuario(
			props,
			criadoEm,
			atualizadoEm,
			id,
			deletadoEm,
		);
	}
}
