export class Render {
	constructor() {}

	attachNode<T>(hookId: string, type?: string): T {
		let element;

		let currentEl = document.getElementById(hookId) as HTMLTemplateElement;
		let importedNode = document.importNode(
			currentEl.content,
			true
		) as DocumentFragment;

		if (importedNode) {
			element = importedNode.firstElementChild as HTMLElement;
			element.id = type ? `${type}-projects` : `${hookId}-id`;
		}

		return element as T;
	}

	getNode(hookId: string): DocumentFragment {
		const currentEl = document.getElementById(hookId) as HTMLTemplateElement;
		const importedNode = document.importNode(
			currentEl.content,
			true
		) as DocumentFragment;

		return importedNode;
	}

	getTemplateElWithId(hookId: string): HTMLElement {
		// get node
		const fragment = this.getNode(hookId);
		// set id
		let element = fragment.firstElementChild as HTMLElement;
		element.id = `${hookId}-id`;
		return element;
	}
}
