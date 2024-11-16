import bcrypt from "bcrypt";
import { prisma } from "../../plugins/prisma.plugin";
import { signJWT } from "../../utils/jwt.util";

export async function signinUseCase(username: string, password: string) {
	const user = await prisma.user.findUnique({ where: { email: username } });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new Error("Invalid credentials");
	}

	const token = signJWT({ id: user.id, email: user.email });
	return token;
}
