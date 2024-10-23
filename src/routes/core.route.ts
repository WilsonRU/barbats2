import type { FastifyInstance } from "fastify";
import { login, register, resetPassword } from "@controllers/core.controller";
import { authenticated } from "@middlewares/auth.middleware";

async function coreRoutes(app: FastifyInstance) {
	app.post("/login", login);
	app.post("/signup", register);

	app.put("/reset-password", { preHandler: [authenticated] }, resetPassword);
}

export default coreRoutes;
export const prefix = "/core";
