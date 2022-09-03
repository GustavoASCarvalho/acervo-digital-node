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
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		super(props, id, criadoEm, atualizadoEm, deletadoEm);
	}

	static criar(
		props: PropriedadesDoComentario,
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		return new Comentario(props, id, criadoEm, atualizadoEm, deletadoEm);
	}
}
