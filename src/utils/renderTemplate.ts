export const renderTemplate = (
	hookId: string,
	child: HTMLDivElement
): HTMLTemplateElement => {
	let importedNode;

	importedNode = document.getElementById(hookId);
	if (importedNode) {
		let clone = (importedNode as HTMLTemplateElement).content.cloneNode(true);
		child.appendChild(clone);
	}

	return <HTMLTemplateElement>importedNode;
};
