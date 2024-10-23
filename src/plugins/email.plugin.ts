import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

interface SendEmailOptions {
	to: string;
	subject: string;
	text: string;
}

const emailPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
	const transporter: Transporter<SMTPTransport.Options> =
		nodemailer.createTransport({
			host: process.env.SMTP_HOST || "",
			port: Number(process.env.SMTP_PORT) || 587,
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		} as SMTPTransport.Options);

	app.decorate("sendEmail", async (options: SendEmailOptions) => {
		const { to, subject, text } = options;
		try {
			const info = await transporter.sendMail({
				from: process.env.SMTP_FROM,
				to,
				subject,
				text,
			});
			app.log.info(`E-mail enviado: ${info.messageId}`);
		} catch (err) {
			const error = err as Error;
			app.log.error(`Erro ao enviar e-mail: ${error.message}`);
		}
	});
};

export default emailPlugin;
