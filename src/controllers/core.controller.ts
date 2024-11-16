import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { statusCode } from "../utils/shared/statusCode";
import { authenticated } from "../middlewares/auth.middleware";

// Usecases
import { signinUseCase } from "usecases/auth/signin.usecase";
import { signupUseCase } from "usecases/auth/signup.usecase";
import { resetPasswordUseCase } from "usecases/auth/resetPassword.usecase";

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
				const token = await signinUseCase(username, password);
				return reply.send({ token });
			} catch (err) {
				return reply.status(statusCode.UNAUTHORIZED).send({
					message: err instanceof Error ? err.message : "Ocorreu um erro.",
				});
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
				const user = await signupUseCase(email, password, name);
				return reply.send({ user });
			} catch (err) {
				return reply.status(statusCode.BAD_REQUEST).send({
					message: err instanceof Error ? err.message : "Ocorreu um erro.",
				});
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
				await resetPasswordUseCase(user?.id as number, password);

				return reply.status(statusCode.ACCEPTED).send({
					message: "Password changed successfully",
				});
			} catch (err) {
				return reply.status(statusCode.BAD_REQUEST).send({
					message: err instanceof Error ? err.message : "Ocorreu um erro.",
				});
			}
		},
	);
}

export default coreController;
export const prefix = "/core";
