import { Imagem } from "../../domain/entities/imagem";

export interface ImagemRepositorio {
  findById(id: string): Promise<Imagem | null>;
}
