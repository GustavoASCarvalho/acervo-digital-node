import { Imagem } from '../../domain/entities/imagem';
import { AtualizandoImagemRequisicao } from '../usecases/imagem/atualizando-imagem';

export interface ImagemRepositorio {
	findById(id: string): Promise<Imagem | null>;
	create(data: Imagem): Promise<Imagem>;
	delete(id: string, deletadoEm: Date): Promise<Imagem>;
	update(data: AtualizandoImagemRequisicao): Promise<Imagem>;
	read(): Promise<Imagem[]>;
	search(query: string): Promise<Imagem[]>;
}
