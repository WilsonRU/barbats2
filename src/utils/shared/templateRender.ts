import ejs from "ejs";
import { join } from "node:path";
import { readFileSync } from "node:fs";

class TemplateRenderer {
	render(file: string, data: object = {}): string {
		const templatePath = join(join(__dirname, "../../templates"), file);
		const templateContent = readFileSync(templatePath, "utf-8");
		return ejs.render(templateContent, data);
	}
}

export default new TemplateRenderer();
