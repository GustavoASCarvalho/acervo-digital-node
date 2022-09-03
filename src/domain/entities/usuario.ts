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
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		super(props, id, criadoEm, atualizadoEm, deletadoEm);
	}

	static criar(
		props: PropriedadesDoUsuario,
		id?: string,
		criadoEm?: Date,
		atualizadoEm?: Date,
		deletadoEm?: Date,
	) {
		return new Usuario(props, id, criadoEm, atualizadoEm, deletadoEm);
	}
}
