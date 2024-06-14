// class imports
import { ProjectInput } from './classes/ProjectInput';

class DragAndDrop {
	projectInput: ProjectInput;

	constructor() {
		this.projectInput = new ProjectInput();
	}

	public run() {
		console.log('Running...');
	}
}

// instantiate classes
const dnd = new DragAndDrop();
dnd.run();

//TODO: finish the isValid checking method
