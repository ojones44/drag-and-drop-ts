export const renderTemplate = <T, U extends { appendChild: Function }>(
	hookId: string,
	root: U
): T => {
	let element;

	let currentEl = document.getElementById(hookId) as HTMLTemplateElement;
	let importedNode = document.importNode(
		currentEl.content,
		true
	) as DocumentFragment;

	if (importedNode) {
		element = importedNode.firstElementChild as HTMLElement;
		element.id = `${hookId}-id`;
		root.appendChild(element);
	}

	return element as T;
};
