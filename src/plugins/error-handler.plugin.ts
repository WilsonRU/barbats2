import type { FastifyInstance, FastifyError } from "fastify";
import fp from "fastify-plugin";

export const errorHandler = fp(async (app: FastifyInstance) => {
	app.setErrorHandler((error: FastifyError, request, reply) => {
		const statusCode = error.statusCode || 500;

		const errorResponse = {
			statusCode,
			message:
				statusCode === 500
					? "Something went wrong, please try again later."
					: error.message,
		};

		app.log.error(error);

		reply.status(statusCode).send(errorResponse);
	});
});
