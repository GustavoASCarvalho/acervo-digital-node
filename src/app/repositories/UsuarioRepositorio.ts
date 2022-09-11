import { Usuario } from '../../domain/entities/usuario';
import { AtualizandoUsuarioRequisicao } from '../usecases/usuario/atualizando-usuario';

export interface UsuarioRepositorio {
	findById(id: string): Promise<Usuario | null>;
	create(data: Usuario): Promise<Usuario>;
	delete(id: string, deletadoEm: Date): Promise<Usuario>;
	update(
		data: Omit<AtualizandoUsuarioRequisicao, 'idDoUsuario'>,
	): Promise<Usuario>;
}
