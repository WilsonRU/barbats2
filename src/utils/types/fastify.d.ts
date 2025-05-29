import { FastifyInstance, FastifyReply } from "fastify";
import type { JwtPayload } from ".";

declare module "fastify" {
	interface FastifyRequest {
		user?: JwtPayload;
	}
}
