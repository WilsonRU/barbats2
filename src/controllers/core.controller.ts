import type { FastifyReply, FastifyRequest } from "fastify";
import {
	authenticateUser,
	registerUser,
	resetUserPassword,
} from "@services/auth.service";
import { statusCode } from "@utils/shared/statusCode";

export async function login(request: FastifyRequest, reply: FastifyReply) {
	const { username, password } = request.body as {
		username: string;
		password: string;
	};

	try {
		const token = await authenticateUser(username, password);
		return reply.send({ token });
	} catch (error) {
		return reply
			.status(statusCode.UNAUTHORIZED)
			.send({ message: "Invalid credentials" });
	}
}

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const { email, password, name } = request.body as {
		email: string;
		password: string;
		name: string;
	};

	try {
		const user = await registerUser(email, password, name);
		return reply.send({ user });
	} catch (error) {
		return reply
			.status(statusCode.BAD_REQUEST)
			.send({ message: "User already exists" });
	}
}

export async function resetPassword(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const user = request.user;

	const { password } = request.body as { password: string };

	try {
		await resetUserPassword(user?.id as number, password);

		return reply.status(statusCode.ACCEPTED).send({
			message: "Password changed successfully",
		});
	} catch (erro) {
		return reply.status(statusCode.BAD_REQUEST).send({
			message: "Unable to change password",
		});
	}
}
