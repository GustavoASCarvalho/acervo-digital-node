import { Entidade } from '../../core/domain/Entidade';

export enum TipoDeCargo {
	MODERADOR = 'MODERADOR',
	ADIMINISTRADOR = 'ADIMINISTRADOR',
	USUARIO = 'USUARIO',
}

export type PropriedadesDoUsuario = {
	nome: string;
	email: string;
	senha: string;
	imagemDePerfil: string;
	cargo: TipoDeCargo;
};

export class Usuario extends Entidade<PropriedadesDoUsuario> {
	private constructor(
		props: PropriedadesDoUsuario,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		super(props, criadoEm, atualizadoEm, id, deletadoEm);
	}

	static criar(
		props: PropriedadesDoUsuario,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		return new Usuario(props, criadoEm, atualizadoEm, id, deletadoEm);
	}
}
