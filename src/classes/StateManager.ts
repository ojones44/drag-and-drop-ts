// type imports
import { ProjectStatus } from '../types/ProjectStatus';
import { Listener } from '../types/Listener';

// class imports
import { Project } from './Project';

export class StateManager<T> {
	protected listeners: Listener<T>[] = [];

	addListener(listener: Listener<T>) {
		this.listeners.push(listener);
	}
}

export class ProjectState extends StateManager<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {
		super();
	}

	static getInstance() {
		if (ProjectState.instance) {
			return this.instance;
		}

		this.instance = new ProjectState();
		return this.instance;
	}

	addProject(title: string, desc: string, people: number) {
		const newProject = new Project(
			Math.random().toString(36),
			title,
			desc,
			people,
			ProjectStatus.Active
		);

		this.projects.push(newProject);
		this.updateListeners();
	}

	updateStatus(id: string, newStatus: ProjectStatus): void {
		const project = this.projects.find((p) => p.id === id)!;

		if (project && project.status !== newStatus) {
			project.status = newStatus;
			this.updateListeners();
		}
	}

	private updateListeners() {
		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice());
		}
	}
}
