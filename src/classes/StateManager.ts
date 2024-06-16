// type imports
import { ProjectStatus } from '../types/ProjectStatus';
import { Listener } from '../types/Listener';

// class imports
import { Project } from './Project';

export class StateManager {
	private static instance: StateManager;
	private projects: Project[] = [];
	private listeners: Listener[] = [];

	private constructor() {}

	static getInstance() {
		if (StateManager.instance) {
			return this.instance;
		}

		this.instance = new StateManager();
		return this.instance;
	}

	addListener(listener: Listener) {
		this.listeners.push(listener);
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
		console.log(this.projects);

		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice());
		}
	}
}
