import { Render } from './Render';

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	protected render: Render;
	protected root: T;
	protected element: U;
	constructor(rootId: string, elementId: string, type?: string) {
		// instantiate dependent classes
		this.render = new Render();

		// get root element and attach nodes
		this.root = document.getElementById(rootId)! as T;
		this.element = this.render.attachNode(elementId, type) as U;
		this.attach();
	}

	abstract configure(): void;
	abstract renderContent(): void;

	private attach() {
		this.root.appendChild(this.element);
	}
}
