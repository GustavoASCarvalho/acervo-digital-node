import { Tag } from '../../domain/entities/tag';

export interface TagRepositorio {
	findById(id: string): Promise<Tag | null>;
	create(data: Tag): Promise<Tag>;
	delete(id: string, deletadoEm: Date): Promise<void>;
}
