// Success
export class Right {
	readonly value: any;

	constructor(value: any) {
		this.value = value;
	}
}

// Error
export class Left {
	readonly value: any;

	constructor(value: any) {
		this.value = value;
	}
}