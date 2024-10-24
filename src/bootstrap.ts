import Fastify from "fastify";
import autoLoad from "@fastify/autoload";
import fastifyRateLimit from "@fastify/rate-limit";

import dotenv from "dotenv";
import { join } from "node:path";
import { readdirSync } from "node:fs";
import fastifyCompress from "@fastify/compress";
import fastifyHelmet from "@fastify/helmet";


dotenv.config();

const APP_PORT = (process.env.APP_PORT || 4001) as number;
const ext = process.env.NODE_ENV === "production" ? ".js" : ".ts";
const routesPath = join(__dirname, "controllers");
const routeFiles = readdirSync(routesPath).filter((file) => file.endsWith(ext));

const app = Fastify({
	logger: true,
});

app.register(fastifyHelmet);
app.register(fastifyRateLimit, {
	max: 100,
	timeWindow: '1 minute'
});
app.register(fastifyCompress, {
	global: true,
	threshold: 2048
});

app.register(autoLoad, {
	dir: join(__dirname, "plugins"),
});

const initialize = async () => {
	try {
		for (const file of routeFiles) {
			const { default: route, prefix } = await import(join(routesPath, file));
			app.register(route, { prefix: prefix || "/" });
		}

		await app.listen({ port: APP_PORT, host: "0.0.0.0" });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
initialize();
