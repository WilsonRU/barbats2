import bcrypt from "bcrypt";
import db from "utils/knex";
import { signJWT } from "../../utils/jwt.util";

export async function signinUseCase(username: string, password: string) {
	const user = await db("users")
		.where("username", username)
		.whereNull("deleted_at")
		.first();

	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new Error("Invalid credentials");
	}

	const token = signJWT({ id: user.id, email: user.email });
	return token;
}
