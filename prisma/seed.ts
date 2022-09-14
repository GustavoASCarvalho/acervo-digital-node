import { PrismaClient, TipoDeCargo } from '@prisma/client';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
	await prisma.usuarios.createMany({
		data: [
			{
				cargo: TipoDeCargo.ADIMINISTRADOR,
				email: 'adiministrador@gmail.com',
				id: randomUUID(),
				nome: 'Administrador',
				senha: await bcrypt.hash('12345678', 10),
				imagem_de_perfil: 'https://i.imgur.com/4Z5w1YR.png',
				criado_em: new Date(),
				atualizado_em: new Date(),
			},
			{
				cargo: TipoDeCargo.MODERADOR,
				email: 'moderador@gmail.com',
				id: randomUUID(),
				nome: 'Moderador',
				senha: await bcrypt.hash('12345678', 10),
				imagem_de_perfil: 'https://i.imgur.com/4Z5w1YR.png',
				criado_em: new Date(),
				atualizado_em: new Date(),
			},
		],
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
