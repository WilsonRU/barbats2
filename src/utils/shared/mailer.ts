import nodemailer from "nodemailer";

interface EmailOptions {
	to: string;
	subject: string;
	text: string;
}

class Mailler {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST || "",
			port: Number(process.env.SMTP_PORT) || 587,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});
	}

	async sendEmail(options: EmailOptions) {
		const mailOptions = {
			from: process.env.SMTP_FROM,
			to: options.to,
			subject: options.subject,
			text: options.text,
		};

		try {
			const info = await this.transporter.sendMail(mailOptions);
			return { success: true, messageId: info.messageId };
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
}

export default new Mailler();
