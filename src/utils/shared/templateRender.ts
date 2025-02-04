import ejs from "ejs";
import { join } from "node:path";
import { readFileSync } from "node:fs";

class TemplateRenderer {
	private templatesDir: string;

	constructor() {
		this.templatesDir = join(__dirname, "../../templates");
	}

	render(file: string, data: object = {}): string {
		const templatePath = join(this.templatesDir, file);
		const templateContent = readFileSync(templatePath, "utf-8");
		return ejs.render(templateContent, data);
	}
}

export default new TemplateRenderer();
