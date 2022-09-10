import crypto from 'crypto';

export abstract class Entidade<T> {
	protected _id: string;
	protected _criadoEm: Date;
	protected _atualizadoEm: Date;
	protected _deletadoEm: Date | undefined;
	public props: T;

	get id() {
		return this._id;
	}

	get criadoEm() {
		return this._criadoEm;
	}

	get atualizadoEm() {
		return this._atualizadoEm;
	}
	get deletadoEm() {
		return this._deletadoEm;
	}

	set deletadoEm(deletadoEm: Date | undefined) {
		this._deletadoEm = deletadoEm;
	}

	set atualizadoEm(atualizadoEm: Date) {
		this._atualizadoEm = atualizadoEm;
	}

	set criadoEm(criadoEm: Date) {
		this._criadoEm = criadoEm;
	}

	constructor(
		props: T,
		criadoEm: Date,
		atualizadoEm: Date,
		id?: string,
		deletadoEm?: Date,
	) {
		this.props = props;
		this._id = id ?? crypto.randomUUID();
		this._criadoEm = criadoEm;
		this._atualizadoEm = atualizadoEm;
		this._deletadoEm = deletadoEm ?? undefined;
	}
}
