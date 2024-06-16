// class imports
import { ProjectInput } from './classes/ProjectInput';
import { ProjectList } from './classes/ProjectList';
import { StateManager } from './classes/StateManager';

class DragAndDrop {
	projectInput: ProjectInput;
	projectList: ProjectList;
	state: StateManager;

	constructor() {
		// initialize state manager
		this.state = StateManager.getInstance();
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

//TODO: finish the isValid checking method
