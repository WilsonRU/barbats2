import { updateUser } from "@controllers/user.controller";
import { authenticated } from "@middlewares/auth.middleware";
import type { FastifyInstance } from "fastify";

async function userRoutes(app: FastifyInstance) {
	app.put("/", { preHandler: [authenticated] }, updateUser);
}

export default userRoutes;
export const prefix = "/user";
