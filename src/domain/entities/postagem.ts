import { Entidade } from '../../core/domain/Entidade';

export type PropriedadesDaPostagem = {
	titulo: string;
	descricao: string;
	texto: string;
	visualizacoes: number;
	idDoUsuario: string;
	eSugestao: boolean;
};

export class Postagem extends Entidade<PropriedadesDaPostagem> {
	private constructor(
		props: PropriedadesDaPostagem,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		super(props, criadoEm, atualizadoEm, id, deletadoEm);
	}

	static criar(
		props: PropriedadesDaPostagem,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		return new Postagem(props, criadoEm, atualizadoEm, id, deletadoEm);
	}
}
