import { Prisma } from '@prisma/client';
import { Entidade } from '../../core/domain/Entidade';

export type PropriedadesDaImagem = {
	url: string;
	nome: string;
	data: string;
	visualizacoes: number;
	endereco: string;
	latitude: string;
	longitude: string;
	idDoUsuario: string;
};

export class Imagem extends Entidade<PropriedadesDaImagem> {
	private constructor(
		props: PropriedadesDaImagem,
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		super(props, id, criadoEm, atualizadoEm, deletadoEm);
	}

	static criar(
		{
			url,
			nome,
			data,
			visualizacoes,
			endereco,
			latitude,
			longitude,
			idDoUsuario,
		}: PropriedadesDaImagem,
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		return new Imagem(
			{
				url,
				nome,
				data,
				visualizacoes,
				endereco,
				latitude,
				longitude,
				idDoUsuario,
			},
			id,
			criadoEm,
			atualizadoEm,
			deletadoEm,
		);
	}
}
