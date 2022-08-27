import { UsuarioRepositorio } from "../../src/app/repositories/UsuarioRepositorio";
import { Usuario } from "../../src/domain/entities/usuario";

export class InMemoryUsuarioRepositorio implements UsuarioRepositorio {
  public items: Usuario[] = [];
  async findById(id: string): Promise<Usuario | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }
}
