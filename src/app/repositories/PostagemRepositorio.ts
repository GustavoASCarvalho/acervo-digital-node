import { Postagem } from "../../domain/entities/postagem";

export interface PostagemRepositorio {
  findById(id: string): Promise<Postagem | null>;
}
