import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { authenticated } from "@middlewares/auth.middleware";
import { statusCode } from "@utils/shared/statusCode";
import { UpdateNameUserCase } from "@usecases/user/UpdateName.usecase";

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
				await UpdateNameUserCase(user?.id as number, name);

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
