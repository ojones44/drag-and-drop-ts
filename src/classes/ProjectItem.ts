// class imports
import { Component } from './Component';
import { Project } from './Project';

// type imports
import { Draggable } from '../types/DragAndDrop';

// decorator imports
import { BindMethod } from '../decorators/BindMethod';

export class ProjectItem
	extends Component<HTMLUListElement, HTMLLIElement>
	implements Draggable
{
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
		this.configure();
	}

	configure() {
		this.element.addEventListener('dragstart', this.dragStartHandler);
		this.element.addEventListener('dragend', this.dragEndHandler);
	}

	@BindMethod
	dragStartHandler(e: DragEvent): void {
		e.dataTransfer!.setData('text/plain', this.item.id);
		e.dataTransfer!.effectAllowed = 'move';
	}

	@BindMethod
	dragEndHandler(_: DragEvent): void {}

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
