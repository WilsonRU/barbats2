import { FastifyInstance, FastifyReply } from "fastify";
import type { PrismaClient } from "@prisma/client";

import type { JwtPayload } from ".";

declare module "fastify" {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
	interface FastifyRequest {
		user?: JwtPayload;
	}
}
