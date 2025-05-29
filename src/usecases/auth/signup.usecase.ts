import bcrypt from "bcrypt";
import db from "utils/knex";

export async function signupUseCase(
	email: string,
	password: string,
	name: string,
) {
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await db("users").insert({
		email,
		password: hashedPassword,
		name,
		created_at: db.fn.now(),
	});
	return user;
}
