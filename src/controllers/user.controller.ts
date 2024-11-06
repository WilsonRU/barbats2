import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { authenticated } from "../middlewares/auth.middleware";
import { updateName } from "../services/user.service";
import { statusCode } from "../utils/shared/statusCode";

async function userController(app: FastifyInstance) {
	app.put(
		"/",
		{
			preHandler: [authenticated],
			schema: {
				body: {
					type: "object",
					properties: {
						name: { type: "string" },
					},
					required: ["name"],
				},
			},
		},
		async (request: FastifyRequest, reply: FastifyReply) => {
			const user = request.user;

			const { name } = request.body as { name: string };

			try {
				await updateName(user?.id as number, name);

				return reply.status(statusCode.ACCEPTED).send({
					message: "Name update complete",
				});
			} catch (err) {
				return reply.status(statusCode.BAD_REQUEST).send({
					message: err instanceof Error ? err.message : "Ocorreu um erro.",
				});
			}
		},
	);
}

export default userController;
export const prefix = "/user";
