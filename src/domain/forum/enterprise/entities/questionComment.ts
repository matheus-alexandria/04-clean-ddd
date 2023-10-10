import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Optional } from '@core/types/optional';

export interface QuestionCommentProps {
  content: string;
  questionId: UniqueEntityID;
  authorId: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
}
export class QuestionComment extends Entity<QuestionCommentProps> {
	get content() {
		return this.props.content;
	}

	set content(content: string) {
		this.props.content = content;
	}

	get authorId() {
		return this.props.authorId;
	}

	get questionId() {
		return this.props.questionId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(props: Optional<QuestionCommentProps, 'createdAt'>, id?: UniqueEntityID) {
		const questionComment = new QuestionComment({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
		return questionComment;
	}
}
