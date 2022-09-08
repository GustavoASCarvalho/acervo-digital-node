import { Postagem } from '../../domain/entities/postagem';

export interface PostagemRepositorio {
	findById(id: string): Promise<Postagem | null>;
	create(data: Postagem): Promise<Postagem>;
	delete(id: string, deletadoEm: Date): Promise<Postagem>;
}
