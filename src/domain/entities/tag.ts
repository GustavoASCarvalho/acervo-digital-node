import { Entidade } from "../../core/domain/Entidade";

export type PropriedadesDaTag = {
  nome: string;
  idDoUsuario: string;
};

export class Tag extends Entidade<PropriedadesDaTag> {
  private constructor(
    props: PropriedadesDaTag,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
    deletadoEm?: Date
  ) {
    super(props, id, criadoEm, atualizadoEm, deletadoEm);
  }

  static criar(
    props: PropriedadesDaTag,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
    deletadoEm?: Date
  ) {
    const tag = new Tag(
      props,
      id,
      criadoEm ?? new Date(),
      atualizadoEm,
      deletadoEm
    );

    return tag;
  }
}
