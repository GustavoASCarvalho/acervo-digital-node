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
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		super(props, criadoEm, atualizadoEm, id, deletadoEm);
	}

	static criar(
		props: PropriedadesDoVoto,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		return new Voto(props, criadoEm, atualizadoEm, id, deletadoEm);
	}
}
