import { Component } from './Component';
import { Project } from './Project';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
	get persons() {
		if (+this.item.people === 1) {
			return '1 person';
		} else {
			return `${this.item.people} people`;
		}
	}

	constructor(root: string, elementId: string, public item: Project) {
		super(root, elementId, item.id);

		this.renderContent();
	}

	configure() {}

	renderContent() {
		this.element.innerHTML = `
        <h2>${this.item.title}</h2>
				<p><strong>Overview:</strong> ${
					this.item.desc ? this.item.desc : 'no description available'
				}</p>
				<p>${this.persons} assigned</p>
			`;
	}
}
