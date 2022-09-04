import { Imagem } from '../../domain/entities/imagem';

export interface ImagemRepositorio {
	findById(id: string): Promise<Imagem | null>;
	create(data: Imagem): Promise<Imagem>;
	delete(id: string, deletadoEm: Date): Promise<Imagem>;
}
