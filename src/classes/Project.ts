// type imports
import { ProjectStatus } from '../types/ProjectStatus';

export class Project {
	constructor(
		public id: string,
		public title: string,
		public desc: string,
		public people: number,
		public status: ProjectStatus.Active | ProjectStatus.Finished
	) {}
}
