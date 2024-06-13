import { BindMethod } from '../decorators/BindMethod';
import { renderTemplate } from '../utils/renderTemplate';

export class ProjectInput {
	renderTemplate: (hookId: string, child: HTMLDivElement) => HTMLElement;
	hostEL: HTMLDivElement;
	templates: string[];

	constructor() {
		this.renderTemplate = renderTemplate;
		this.templates = ['project-input', 'single-project', 'project-list'];

		// render template tags
		this.hostEL = document.getElementById('app')! as HTMLDivElement;
	}

	attachNodes() {
		this.templates.forEach((template) => {
			this.renderTemplate(template, this.hostEL) as HTMLTemplateElement;
		});
	}

	formControl() {
		const addProjectForm = document.querySelector('form');

		if (addProjectForm) {
			(addProjectForm as HTMLFormElement).addEventListener('submit', (e) => {
				e.preventDefault();

				const title = document.getElementById('title') as HTMLInputElement;
				const description = document.getElementById(
					'description'
				) as HTMLTextAreaElement;
				const people = document.getElementById('people') as HTMLInputElement;

				if (title && description && people) {
					this.handleSubmit({
						title: title.value,
						description: description.value,
						people: +people.value,
					});
				}
			});
		}
	}

	@BindMethod
	handleSubmit(form: { title: string; description: string; people: number }) {
		console.log(form);
	}
}
