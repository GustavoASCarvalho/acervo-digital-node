import { Comentario } from '../../domain/entities/comentario';

export interface ComentarioRepositorio {
	findById(id: string): Promise<Comentario | null>;
	create(data: Comentario): Promise<Comentario>;
	delete(id: string, deletadoEm: Date): Promise<Comentario>;
}
