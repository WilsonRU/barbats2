import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

export const prisma = new PrismaClient();

export const prismaPlugin = fp(async (app, _opts) => {
	app.decorate("prisma", prisma);

	app.addHook("onClose", async (app) => {
		await app.prisma.$disconnect();
	});
});
