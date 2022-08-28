import { Usuario } from '../../domain/entities/usuario';

export interface UsuarioRepositorio {
	create(data: Usuario): Promise<Usuario>;
	findById(id: string): Promise<Usuario | null>;
}
