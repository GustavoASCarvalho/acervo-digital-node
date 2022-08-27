import { TagRepositorio } from "../../src/app/repositories/TagRepositorio";
import { Tag } from "../../src/domain/entities/tag";

export class InMemoryTagRepositorio implements TagRepositorio {
  public items: Tag[] = [];
  async findById(id: string): Promise<Tag | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }
}
