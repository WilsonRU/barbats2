import { verifyJWT } from "@utils/jwt.util";
import { JwtPayload } from "@utils/types/jwtPayload";
import type {
	FastifyReply,
	FastifyRequest,
	preHandlerHookHandler,
} from "fastify";

export const authenticated: preHandlerHookHandler =
	async function authenticated(
		request: FastifyRequest,
		reply: FastifyReply,
		done: Function,
	) {
		try {
			const authHeader = request.headers.authorization;
			if (!authHeader) {
				return reply
					.status(401)
					.send({ message: "Missing authorization header" });
			}

			const token = authHeader.split(" ")[1];
			if (!token) {
				return reply.status(401).send({ message: "Invalid token format" });
			}

			const userPayload = verifyJWT(token) as JwtPayload;
			request.user = userPayload;
		} catch (err) {
			return reply.status(401).send({ message: "Invalid token" });
		}
	};
