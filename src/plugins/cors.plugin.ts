import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import cors, { FastifyCorsOptions } from "@fastify/cors";

const corsPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
	const corsOptions: FastifyCorsOptions = {
		origin: (origin, cb) => {
			const hostname = new URL(origin as string).hostname;
			const allowedOrigins = ["localhost"];

			if (!origin || allowedOrigins.includes(hostname)) {
				cb(null, true);
				return;
			}
			cb(new Error("Destino não autorizado"), false);
		},
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	};
	app.register(cors, corsOptions);
};

export default corsPlugin;
