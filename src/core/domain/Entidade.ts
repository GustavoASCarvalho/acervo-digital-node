import crypto from "crypto";

export abstract class Entidade<T> {
  protected _id: string;
  protected _criadoEm: Date;
  protected _atualizadoEm: Date;
  protected _deletadoEm?: Date;
  public props: T;

  get id() {
    return this._id;
  }

  constructor(
    props: T,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
    deletadoEm?: Date
  ) {
    this.props = props;
    this._id = id ?? crypto.randomUUID();
    this._criadoEm = criadoEm ?? new Date();
    this._atualizadoEm = atualizadoEm ?? new Date();
    this._deletadoEm = deletadoEm ?? undefined;
  }
}
