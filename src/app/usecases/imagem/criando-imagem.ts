import { Imagem } from "../../../domain/entities/imagem";
import { UsuarioRepositorio } from "../../repositories/UsuarioRepositorio";

export type CriandoImagemRequisicao = {
  nome: string;
  data: string;
  endereco: string;
  idDoUsuario: string;
};

export class CriandoImagem {
  constructor(private usuarioRepositorio: UsuarioRepositorio) {}

  async executar({
    nome,
    data,
    endereco,
    idDoUsuario,
  }: CriandoImagemRequisicao) {
    const usuario = await this.usuarioRepositorio.findById(idDoUsuario);

    if (!usuario) {
      throw new Error("Usuario não encontrado.");
    }

    const imagem = Imagem.criar({
      nome,
      data,
      endereco,
      idDoUsuario,
      latitude: "-232",
      longitude: "-232",
      url: "http://",
      visualizacoes: 0,
    });

    return imagem;
  }
}
