// class imports
import { Component } from './Component';
import { ProjectState } from './StateManager';

// decorator imports
import { BindMethod } from '../decorators/BindMethod';

// type imports
import { Validate } from '../types/Validate';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputEl: HTMLInputElement;
	descInputEl: HTMLInputElement;
	peopleInputEl: HTMLInputElement;

	constructor(private state: ProjectState) {
		super('app', 'project-input');
		// inputs (root should be set in Component)
		this.titleInputEl = this.root.querySelector('#title') as HTMLInputElement;
		this.descInputEl = this.root.querySelector('#desc') as HTMLInputElement;
		this.peopleInputEl = this.root.querySelector('#people') as HTMLInputElement;

		// confuguration
		this.configure();
	}

	testing() {
		this.state.addProject('from project input class', 'something', 2);
	}

	configure() {
		this.element.addEventListener('submit', this.submitHandler);
	}

	renderContent() {}

	private validateLength(...data: string[]): boolean {
		return data.every((input) => input.trim().length !== 0);
	}

	private isValid(input: Validate): boolean {
		if (input.value === null || undefined) return false;
		let valid = true;
		const inputLength = input.value.toString().trim().length;

		if (input.required) valid = valid && inputLength !== 0;

		if (typeof input.value === 'string') {
			if (input.minLength) valid = valid && inputLength >= input.minLength;
			if (input.maxLength) valid = valid && inputLength <= input.maxLength;
		} else if (typeof input.value === 'number') {
			if (input.min) valid = valid && +input.value >= input.min;
			if (input.max) valid = valid && +input.value <= input.max;
		}

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
			maxLength: 50,
		};

		const descValidation: Validate = { value: enteredDesc, required: false };

		const peopleValidation: Validate = {
			value: enteredPeople,
			required: true,
			min: 1,
			max: 10,
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
			this.state.addProject(title, desc, people);

			this.clearInputs();
		}
	}
}
