import { Usuario } from "../../domain/entities/usuario";

export interface UsuarioRepositorio {
  findById(id: string): Promise<Usuario | null>;
}
