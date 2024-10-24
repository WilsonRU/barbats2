import { FastifyInstance, FastifyReply } from "fastify";
import type { PrismaClient } from "@prisma/client";

import type { JwtPayload } from "./jwtPayload";

declare module "fastify" {
	interface FastifyInstance {
		prisma: PrismaClient;
		sendEmail(options: {
			to: string;
			subject: string;
			text: string;
		}): Promise<void>;
	}
	interface FastifyRequest {
		user?: JwtPayload;
	}
}
