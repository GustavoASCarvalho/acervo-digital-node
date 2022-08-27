import { InMemoryUsuarioRepositorio } from "../../../../tests/repositories/in-memory-usuario-repositorio";
import { Imagem } from "../../../domain/entities/imagem";
import {
  CargosDoUsuarioEnum,
  PropriedadesDoUsuario,
  Usuario,
} from "../../../domain/entities/usuario";
import { CriandoImagem } from "./criando-imagem";

describe("criando imagem usecase", () => {
  it("deve criar uma imagem com sucesso", async () => {
    const usuarioRepositorio = new InMemoryUsuarioRepositorio();
    const propriedadesDoUsuario: PropriedadesDoUsuario = {
      nome: "Usuario",
      email: "usuario@email.com",
      senha: "senha",
      imagemDePerfil: "https://www.imagem.com/image.png",
      cargo: CargosDoUsuarioEnum.USUARIO,
    };

    const usuario = Usuario.criar(propriedadesDoUsuario);

    usuarioRepositorio.items.push(usuario);

    const sut = new CriandoImagem(usuarioRepositorio);
    const res = await sut.executar({
      data: "26/05/2003",
      endereco: "Rua dos gatos",
      idDoUsuario: usuario.id,
      nome: "Imagem de um gato",
    });
    expect(res).toBeInstanceOf(Imagem);
  });
});
