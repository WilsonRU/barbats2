import bcrypt from "bcrypt";
import { prisma } from "@plugins/prisma.plugin";

export async function signupUseCase(
	email: string,
	password: string,
	name: string,
) {
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			name,
		},
	});
	return user;
}
