import { prisma } from "../../plugins/prisma.plugin";

export async function UpdateNameUserCase(id: number, name: string) {
	await prisma.user.update({
		where: { id },
		data: {
			name,
		},
	});
}
