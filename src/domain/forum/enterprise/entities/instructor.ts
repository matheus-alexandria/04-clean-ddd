import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';

export class Instructor extends Entity<InstructorProps> {
	get name() {
		return this.props.name;
	}

	static create(props: InstructorProps, id?: UniqueEntityID) {
		const instructor = new Instructor(props, id);
		return instructor;
	}
}

interface InstructorProps {
    name: string;
}