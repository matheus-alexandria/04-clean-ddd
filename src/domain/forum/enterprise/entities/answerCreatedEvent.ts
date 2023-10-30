import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { DomainEvent } from '@core/events/domainEvent';
import { Answer } from './answer';

export class AnswerCreatedEvent implements DomainEvent {
	public ocurredAt: Date;
	public answer: Answer;

	constructor(answer: Answer) {
		this.answer = answer;
		this.ocurredAt = new Date();
	}

	getAggregateId(): UniqueEntityID {
		return this.answer.id;
	}
}