import { Usuario } from '../../domain/entities/usuario';

export interface AutenticacaoRepositorio {
	autenticar(email: string, senha: string): Promise<Usuario>;
}
