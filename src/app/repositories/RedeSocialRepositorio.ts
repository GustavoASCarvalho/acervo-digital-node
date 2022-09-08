import { RedeSocial } from '../../domain/entities/redeSocial';

export interface RedeSocialRepositorio {
	findById(id: string): Promise<RedeSocial | null>;
	create(data: RedeSocial): Promise<RedeSocial>;
	delete(id: string, deletadoEm: Date): Promise<RedeSocial>;
}
