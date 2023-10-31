import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { DomainEvent } from '@core/events/domainEvent';
import { AnswerComment } from './answerComment';

export class CommentOnAnswerEvent implements DomainEvent {
	public ocurredAt: Date;
	public answerComment: AnswerComment;

	constructor(answerComment: AnswerComment) {
		this.answerComment = answerComment;
		this.ocurredAt = new Date();
	}

	getAggregateId(): UniqueEntityID {
		return this.answerComment.id;
	}
}