// class imports
import { Component } from './Component';
import { ProjectState } from './StateManager';
import { Project } from './Project';
import { ProjectStatus } from '../types/ProjectStatus';
import { ProjectItem } from './ProjectItem';

// type imports
import { DragTarget } from '../types/DragAndDrop';

// decorator imports
import { BindMethod } from '../decorators/BindMethod';

export class ProjectList
	extends Component<HTMLDivElement, HTMLFormElement>
	implements DragTarget
{
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

		this.element.addEventListener('dragover', this.dragOverHandler);
		this.element.addEventListener('dragleave', this.dragLeaveHandler);
		this.element.addEventListener('drop', this.dropHandler);
	}

	@BindMethod
	dragOverHandler(e: DragEvent): void {
		if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
			e.preventDefault();
			const listEl = this.element.querySelector('ul')! as HTMLUListElement;
			listEl.classList.add('droppable');
		}
	}

	@BindMethod
	dragLeaveHandler(_: DragEvent): void {
		const listEl = this.element.querySelector('ul')! as HTMLUListElement;
		listEl.classList.remove('droppable');
	}

	@BindMethod
	dropHandler(e: DragEvent): void {
		const prjID = e.dataTransfer!.getData('text/plain');
		const newStatus =
			this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished;
		this.state.updateStatus(prjID, newStatus);
		const listEl = this.element.querySelector('ul')! as HTMLUListElement;
		listEl.classList.remove('droppable');
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
