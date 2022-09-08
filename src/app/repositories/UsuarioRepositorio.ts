import { Usuario } from '../../domain/entities/usuario';

export interface UsuarioRepositorio {
	findById(id: string): Promise<Usuario | null>;
	create(data: Usuario): Promise<Usuario>;
	delete(id: string, deletadoEm: Date): Promise<Usuario>;
}
