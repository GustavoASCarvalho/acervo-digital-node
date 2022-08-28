import { Entidade } from '../../core/domain/Entidade';

export type PropriedadesDaPostagem = {
	titulo: string;
	descricao: string;
	texto: string;
	visualizacoes: number;
	idDoUsuario: string;
};

export class Postagem extends Entidade<PropriedadesDaPostagem> {
	private constructor(
		props: PropriedadesDaPostagem,
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		super(props, id, criadoEm, atualizadoEm, deletadoEm);
	}

	static criar(
		props: PropriedadesDaPostagem,
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		return new Postagem(props, id, criadoEm, atualizadoEm, deletadoEm);
	}
}
