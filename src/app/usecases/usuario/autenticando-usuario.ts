import { ApiError } from '../../../helpers/types/api-error';
import { AutenticacaoRepositorio } from '../../repositories/AutenticacaoRepositorio';
import jwt from 'jsonwebtoken';

export type AutenticandoUsuarioRequisicao = {
	email: string;
	senha: string;
};

export class AutenticandoUsuario {
	constructor(private autenticacaoRepositorio: AutenticacaoRepositorio) {}

	async executar({ email, senha }: AutenticandoUsuarioRequisicao) {
		await validacaoDaRequisicao({ email, senha });

		const usuario = await this.autenticacaoRepositorio.autenticar(email, senha);

		return jwt.sign(
			{
				id: usuario.id,
			},
			process.env.JWT_PASS!,
			{ expiresIn: '8h' },
		);
	}
}

async function validacaoDaRequisicao({
	email,
	senha,
}: AutenticandoUsuarioRequisicao) {
	if (!email) {
		throw new ApiError(`Campo 'email' ausente na requisição.`, 400);
	} else if (
		!(email.includes('@') && email.includes('.')) ||
		email.startsWith('@') ||
		email.startsWith('.')
	) {
		throw new ApiError(`Campo 'email' invalido`, 400);
	}
	if (!senha) {
		throw new ApiError(`Campo 'senha' ausente na requisição.`, 400);
	}
}
