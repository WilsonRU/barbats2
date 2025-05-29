import bcrypt from "bcrypt";
import db from "utils/knex";

export async function resetPasswordUseCase(id: number, password: string) {
	const hashedPassword = await bcrypt.hash(password, 10);

	await db("users").where("id", id).update({
		password: hashedPassword,
	});
}
