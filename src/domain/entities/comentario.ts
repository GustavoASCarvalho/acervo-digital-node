import { Entidade } from '../../core/domain/Entidade';

export type PropriedadesDoComentario = {
	titulo: string;
	texto: string;
	idDoUsuario: string;
	idDaPostagem?: string;
	idDoImagem?: string;
};

export class Comentario extends Entidade<PropriedadesDoComentario> {
	private constructor(
		props: PropriedadesDoComentario,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		super(props, criadoEm, atualizadoEm, id, deletadoEm);
	}

	static criar(
		props: PropriedadesDoComentario,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		return new Comentario(props, criadoEm, atualizadoEm, id, deletadoEm);
	}
}
