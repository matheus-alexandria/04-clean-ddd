// Success
export class Right<R, L> {
	readonly value: R;

	constructor(value: R) {
		this.value = value;
	}

	isRight(): this is Right<R, L> {
		return true;
	}

	isLeft(): this is Left<L, R> {
		return false;
	}
}

// Error
export class Left<L, R> {
	readonly value: L;

	constructor(value: L) {
		this.value = value;
	}

	isRight(): this is Right<R, L> {
		return false;
	}

	isLeft(): this is Left<L, R> {
		return true;
	}
}

export type Either<L, R> = Left<L, R> | Right<R, L>;

export const right = <L, R>(value: R): Either<L, R> => {
	return new Right<R, L>(value);
};

export const left = <L, R>(value: L): Either<L, R> => {
	return new Left<L, R>(value);
};
