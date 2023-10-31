import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Optional } from '@core/types/optional';
import { Comment, CommentProps } from './comment';
import { CommentOnAnswerEvent } from './commentOnAnswerEvent';

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID;
}
export class AnswerComment extends Comment<AnswerCommentProps> {
	get answerId() {
		return this.props.answerId;
	}
  
	get excerpt() {
		return this.content.substring(0,120).trimEnd().concat('...');
	}

	static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityID) {
		const answerComment = new AnswerComment({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);

		if (!id) {
			answerComment.addDomainEvent(new CommentOnAnswerEvent(answerComment));
		}

		return answerComment;
	}
}
