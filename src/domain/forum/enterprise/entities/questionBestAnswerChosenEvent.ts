import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { DomainEvent } from '@core/events/domainEvent';
import { Question } from './question';

export class QuestionBestAnswerChosenEvent implements DomainEvent {
	public ocurredAt: Date;
	public question: Question;
	public bestAnswerId: UniqueEntityID;

	constructor(question: Question, bestAnswerId: UniqueEntityID) {
		this.question = question;
		this.bestAnswerId = bestAnswerId;
		this.ocurredAt = new Date();
	}

	getAggregateId(): UniqueEntityID {
		return this.question.id;
	}
}