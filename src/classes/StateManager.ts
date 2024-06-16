export class StateManager {
	private static instance: StateManager;
	private projects: any[] = [];

	private constructor() {}

	static getInstance() {
		if (StateManager.instance) {
			return this.instance;
		}

		this.instance = new StateManager();
		return this.instance;
	}

	addProject(title: string, desc: string, people: number) {
		const newProject = {
			id: Math.random().toString(36),
			title,
			desc,
			people,
		};

		this.projects.push(newProject);
		console.log(this.projects);
	}
}
