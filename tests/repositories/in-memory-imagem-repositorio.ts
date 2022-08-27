import { ImagemRepositorio } from "../../src/app/repositories/ImagemRepositorio";
import { Imagem } from "../../src/domain/entities/imagem";

export class InMemoryImagemRepositorio implements ImagemRepositorio {
  public items: Imagem[] = [];
  async findById(id: string): Promise<Imagem | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }
}
