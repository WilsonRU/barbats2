import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import autoLoad from "@fastify/autoload";
import { join } from "node:path";
import { readdirSync } from "node:fs";
import dotenv from "dotenv";

const app = Fastify();

dotenv.config();

const APP_PORT = (process.env.APP_PORT || 4001) as number;

app.register(autoLoad, {
	dir: join(__dirname, "plugins"),
});

async function loadRoutes() {
	const routesPath = join(__dirname, "routes");
	const routeFiles = readdirSync(routesPath).filter((file) =>
		file.endsWith(".ts"),
	);

	for (const file of routeFiles) {
		const { default: route, prefix } = await import(join(routesPath, file));
		app.register(route, { prefix: prefix || "/" });
	}
}

loadRoutes().catch((err) => {
	app.log.error(err);
});

const start = async () => {
	try {
		await app.listen({ port: APP_PORT, host: "0.0.0.0" });
		console.log(`Server is running in port ${APP_PORT} 🚀`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
