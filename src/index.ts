// class imports
import { ProjectInput } from './classes/ProjectInput';
import { ProjectList } from './classes/ProjectList';
import { ProjectState } from './classes/StateManager';

class DragAndDrop {
	projectInput: ProjectInput;
	projectList: ProjectList;
	state: ProjectState;

	constructor() {
		// initialize state manager
		this.state = ProjectState.getInstance();
		this.projectInput = new ProjectInput(this.state);
		this.projectList = new ProjectList(this.state, 'active');
		this.projectList = new ProjectList(this.state, 'finished');
	}

	public run() {
		console.log('Running...');
	}
}

// instantiate classes
const dnd = new DragAndDrop();
dnd.run();
