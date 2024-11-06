import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
	authenticateUser,
	registerUser,
	resetUserPassword,
} from "../services/auth.service";
import { statusCode } from "../utils/shared/statusCode";
import { authenticated } from "../middlewares/auth.middleware";

async function coreController(app: FastifyInstance) {
	app.post(
		"/login",
		{
			schema: {
				body: {
					type: "object",
					properties: {
						username: { type: "string" },
						password: { type: "string" },
					},
					required: ["username", "password"],
				},
			},
		},
		async (request: FastifyRequest, reply: FastifyReply) => {
			const { username, password } = request.body as {
				username: string;
				password: string;
			};

			try {
				const token = await authenticateUser(username, password);
				return reply.send({ token });
			} catch (error) {
				return reply
					.status(statusCode.UNAUTHORIZED)
					.send({ message: "Invalid credentials" });
			}
		},
	);

	app.post(
		"/signup",
		{
			schema: {
				body: {
					type: "object",
					properties: {
						username: { type: "string" },
						password: { type: "string" },
						name: { type: "string" },
					},
					required: ["username", "password", "name"],
				},
			},
		},
		async (request: FastifyRequest, reply: FastifyReply) => {
			const { email, password, name } = request.body as {
				email: string;
				password: string;
				name: string;
			};

			try {
				const user = await registerUser(email, password, name);
				return reply.send({ user });
			} catch (error) {
				return reply
					.status(statusCode.BAD_REQUEST)
					.send({ message: "User already exists" });
			}
		},
	);

	app.put(
		"/reset-password",
		{
			preHandler: [authenticated],
			schema: {
				body: {
					type: "object",
					properties: {
						password: { type: "string" },
					},
					required: ["password"],
				},
			},
		},
		async (request: FastifyRequest, reply: FastifyReply) => {
			const user = request.user;

			const { password } = request.body as { password: string };

			try {
				await resetUserPassword(user?.id as number, password);

				return reply.status(statusCode.ACCEPTED).send({
					message: "Password changed successfully",
				});
			} catch (erro) {
				return reply.status(statusCode.BAD_REQUEST).send({
					message: "Unable to change password",
				});
			}
		},
	);
}

export default coreController;
export const prefix = "/core";
