import { authenticated } from "@middlewares/auth.middleware";
import { updateName } from "@services/user.service";
import { statusCode } from "@utils/shared/statusCode";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

async function userController(app: FastifyInstance) {
	app.put(
		"/",
		{ preHandler: [authenticated] },
		async function (request: FastifyRequest, reply: FastifyReply) {
			const user = request.user;

			const { name } = request.body as { name: string };

			try {
				await updateName(user?.id as number, name);

				return reply.status(statusCode.ACCEPTED).send({
					message: "Name update complete",
				});
			} catch (erro) {
				return reply.status(statusCode.BAD_REQUEST).send({
					message: "Unable to update user",
				});
			}
		},
	);
}

export default userController;
export const prefix = "/user";
