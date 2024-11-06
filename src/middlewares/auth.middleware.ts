import { verifyJWT } from "../utils/jwt.util";
import type { JwtPayload } from "../utils/types";
import type {
	FastifyReply,
	FastifyRequest,
	preHandlerHookHandler,
} from "fastify";

export const authenticated: preHandlerHookHandler =
	async function authenticated(
		request: FastifyRequest,
		reply: FastifyReply,
		done: () => void,
	) {
		try {
			const authHeader = request.headers.authorization;
			if (!authHeader) {
				return reply.status(401).send({ message: "Token não encontrado" });
			}

			const token = authHeader.split(" ")[1];
			if (!token) {
				return reply.status(401).send({ message: "Token no formato inválido" });
			}

			const userPayload = verifyJWT(token) as JwtPayload;
			request.user = userPayload;
		} catch (err) {
			return reply.status(401).send({ message: "Token expirado ou inválido" });
		}
	};
