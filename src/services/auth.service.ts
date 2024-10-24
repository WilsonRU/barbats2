import bcrypt from "bcrypt";
import { prisma } from "../plugins/prisma.plugin";
import { signJWT } from "../utils/jwt.util";

export async function registerUser(
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

export async function authenticateUser(username: string, password: string) {
	const user = await prisma.user.findUnique({ where: { email: username } });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new Error("Invalid credentials");
	}

	const token = signJWT({ id: user.id, email: user.email });
	return token;
}

export async function resetUserPassword(id: number, password: string) {
	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.user.update({
		where: { id },
		data: {
			password: hashedPassword,
		},
	});
}
