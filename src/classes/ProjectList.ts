// class imports
import { Component } from './Component';
import { ProjectState } from './StateManager';
import { Project } from './Project';
import { ProjectStatus } from '../types/ProjectStatus';
import { ProjectItem } from './ProjectItem';

export class ProjectList extends Component<HTMLDivElement, HTMLFormElement> {
	assignedProjects: Project[];

	constructor(
		private state: ProjectState,
		private type: 'active' | 'finished'
	) {
		super('app', 'project-list', type);
		this.assignedProjects = [];

		this.configure();
		this.injectProjectLists();
	}

	testing() {
		this.state.addProject('from project list class', 'something', 2);
	}

	configure() {
		this.state.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter((project) => {
				if (this.type === 'active') {
					return project.status === ProjectStatus.Active;
				} else {
					return project.status === ProjectStatus.Finished;
				}
			});
			this.assignedProjects = relevantProjects;
			this.renderContent();
		});
	}

	renderContent() {
		const id = `${this.type}-projects-list`;
		const listEl = document.getElementById(id)! as HTMLUListElement;
		listEl.innerHTML = '';
		for (const prjItem of this.assignedProjects) {
			new ProjectItem(
				this.element.querySelector('ul')!.id,
				'single-project',
				prjItem
			);
		}
	}

	private injectProjectLists() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector(
			'h2'
		)!.textContent = `${this.type.toUpperCase()} PROJECTS`;
	}
}
