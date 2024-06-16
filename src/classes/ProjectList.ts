// class imports
import { Render } from './Render';
import { StateManager } from './StateManager';

export class ProjectList {
	render: Render;
	root: HTMLDivElement;
	element: HTMLTemplateElement;

	constructor(
		private state: StateManager,
		private type: 'active' | 'finished'
	) {
		this.render = new Render();
		this.root = document.getElementById('app')! as HTMLDivElement;
		this.element = this.render.attachNode<HTMLTemplateElement>(
			'project-list',
			type
		);

		this.attach();
		this.injectProjectLists();
	}

	private attach() {
		this.root.appendChild(this.element);
	}

	private injectProjectLists() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector(
			'h2'
		)!.textContent = `${this.type.toUpperCase()} PROJECTS`;
	}

	testing() {
		this.state.addProject('from project list class', 'something', 2);
	}
}
