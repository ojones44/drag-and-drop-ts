import { Component } from './Component';
import { Project } from './Project';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
	item: Project;

	constructor(root: string, elementId: string, item: Project) {
		super(root, elementId);
		this.item = item;

		this.renderContent();
		// this.configure();
	}

	configure() {}

	renderContent() {
		this.element.innerHTML = `
        <h3>${this.item.title}</h3>
				<p>Overview: ${this.item.desc ? this.item.desc : 'no description available'}</p>
				<p>Number of people involved: ${this.item.people}</p>
			`;
	}
}
