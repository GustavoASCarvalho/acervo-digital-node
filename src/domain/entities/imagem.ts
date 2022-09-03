import { Entidade } from '../../core/domain/Entidade';

export type PropriedadesDaImagem = {
	url: string;
	nome: string;
	data: Date;
	visualizacoes: number;
	endereco: string;
	latitude: string;
	longitude: string;
	idDoUsuario: string;
};

export class Imagem extends Entidade<PropriedadesDaImagem> {
	private constructor(
		props: PropriedadesDaImagem,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		super(props, criadoEm, atualizadoEm, id, deletadoEm);
	}

	static criar(
		props: PropriedadesDaImagem,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		return new Imagem(props, criadoEm, atualizadoEm, id, deletadoEm);
	}
}
