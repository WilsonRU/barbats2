import bcrypt from "bcrypt";
import { prisma } from "../../plugins/prisma.plugin";

export async function resetPasswordUseCase(id: number, password: string) {
	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.user.update({
		where: { id },
		data: {
			password: hashedPassword,
		},
	});
}
