import { Entidade } from "../../core/domain/Entidade";

export enum CargosDoUsuarioEnum {
  MODERADOR = "Moderador",
  ADIMINISTRADOR = "Adiministrador",
  USUARIO = "Usuario",
}

export type PropriedadesDoUsuario = {
  nome: string;
  email: string;
  senha: string;
  imagemDePerfil: string;
  cargo: CargosDoUsuarioEnum;
};

export class Usuario extends Entidade<PropriedadesDoUsuario> {
  private constructor(
    props: PropriedadesDoUsuario,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
    deletadoEm?: Date
  ) {
    super(props, id, criadoEm, atualizadoEm, deletadoEm);
  }

  static criar(
    props: PropriedadesDoUsuario,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
    deletadoEm?: Date
  ) {
    const usuario = new Usuario(props, id, criadoEm, atualizadoEm, deletadoEm);

    return usuario;
  }
}
