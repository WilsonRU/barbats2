import db from "utils/knex";

export async function UpdateNameUserCase(id: number, name: string) {
	await db("users").where("id", id).update({
		name,
	});
}
