// class imports
import { Render } from './Render';
import { StateManager } from './StateManager';
import { Project } from './Project';

export class ProjectList {
	render: Render;
	root: HTMLDivElement;
	element: HTMLTemplateElement;
	assignedProjects: Project[];

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
		this.assignedProjects = [];

		this.state.addListener((projects: Project[]) => {
			this.assignedProjects = projects;
			this.renderProjects();
		});

		this.attach();
		this.injectProjectLists();
	}

	private attach() {
		this.root.appendChild(this.element);
	}

	private renderProjects() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		)! as HTMLUListElement;
		listEl.innerHTML = '';
		for (const prjItem of this.assignedProjects) {
			const listItem = document.createElement('li') as HTMLLIElement;
			listItem.innerHTML = `
        <h3>${prjItem.title}</h3>
				<p>Overview: ${prjItem.desc ? prjItem.desc : 'no description available'}</p>
				<p>Number of people involved: ${prjItem.people}</p>
			`;
			listEl.appendChild(listItem);
		}
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
