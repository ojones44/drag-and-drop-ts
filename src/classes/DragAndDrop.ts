import { BindMethod } from '../decorators/BindMethod';

export class DragAndDrop {
	project: string;

	constructor(project: string) {
		this.project = project;
	}

	@BindMethod
	printMessage(message: string) {
		console.log(message);
	}
}
