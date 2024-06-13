export const renderTemplate = (hookId: string) => {
	let temp;

	temp = document.getElementById(hookId);
	if (temp) {
		let clone = (temp as HTMLTemplateElement).content.cloneNode(true);
		document.body.appendChild(clone);
	}
};
