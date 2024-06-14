import { BindMethod } from '../decorators/BindMethod';
import { renderTemplate } from '../utils/renderTemplate';

// type imports
import { Validate } from '../types/Validate';

export class ProjectInput {
	renderTemplate: <T, U extends { appendChild: Function }>(
		hookId: string,
		child: U
	) => T;
	root: HTMLDivElement;
	form: HTMLFormElement;
	titleInputEl: HTMLInputElement;
	descInputEl: HTMLInputElement;
	peopleInputEl: HTMLInputElement;

	constructor() {
		// get rood element and attach nodes
		this.root = document.getElementById('app')! as HTMLDivElement;
		this.renderTemplate = renderTemplate;
		this.form = this.attachNode('project-input');

		// inputs (root should now be set)
		this.titleInputEl = this.root.querySelector('#title') as HTMLInputElement;
		this.descInputEl = this.root.querySelector('#desc') as HTMLInputElement;
		this.peopleInputEl = this.root.querySelector('#people') as HTMLInputElement;

		// confuguration
		this.configure();
	}

	private validateLength(...data: string[]): boolean {
		return data.every((input) => input.trim().length !== 0);
	}

	private isValid(input: Validate): boolean {
		let valid = true;
		const inputLength = input.value.trim().length;

		if (input.required) valid = valid && inputLength !== 0;
		if (input.minLength) valid = valid && inputLength >= input.minLength;
		if (input.maxLength) valid = valid && inputLength <= input.maxLength;
		if (input.min) valid = valid && +input.value >= input.min;
		if (input.max) valid = valid && +input.value <= input.max;

		return valid;
	}

	private clearInputs() {
		this.titleInputEl.value = '';
		this.descInputEl.value = '';
		this.peopleInputEl.value = '';
	}

	private getUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputEl.value;
		const enteredDesc = this.descInputEl.value;
		const enteredPeople = this.peopleInputEl.value;

		const titleValidation: Validate = {
			value: enteredTitle,
			required: true,
			minLength: 2,
		};

		const descValidation: Validate = { value: enteredDesc, required: false };

		const peopleValidation: Validate = {
			value: enteredPeople,
			required: true,
			min: 3,
		};

		if (
			this.isValid(titleValidation) &&
			this.isValid(descValidation) &&
			this.isValid(peopleValidation)
		) {
			return [enteredTitle, enteredDesc, +enteredPeople];
		} else {
			alert('Invalid input. Please try again!');
			return;
		}
	}

	@BindMethod
	private submitHandler(e: Event) {
		e.preventDefault();
		const userInput = this.getUserInput();

		if (Array.isArray(userInput)) {
			const [title, desc, people] = userInput;
			console.log(title, desc, people);
			this.clearInputs();
		}
	}

	private configure() {
		this.form.addEventListener('submit', this.submitHandler);
	}

	private attachNode(template: string) {
		return this.renderTemplate<HTMLFormElement, HTMLDivElement>(
			template,
			this.root
		);
	}
}
