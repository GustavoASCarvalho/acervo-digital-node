import { Entidade } from '../../core/domain/Entidade';

export enum TipoDeVoto {
	POSITIVO = 'POSITIVO',
	NEGATIVO = 'NEGATIVO',
}

export type PropriedadesDoVoto = {
	idDoComentario: string;
	voto: TipoDeVoto;
	idDoUsuario: string;
};

export class Voto extends Entidade<PropriedadesDoVoto> {
	private constructor(
		props: PropriedadesDoVoto,
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		super(props, id, criadoEm, atualizadoEm, deletadoEm);
	}

	static criar(
		props: PropriedadesDoVoto,
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		return new Voto(props, id, criadoEm, atualizadoEm, deletadoEm);
	}
}
