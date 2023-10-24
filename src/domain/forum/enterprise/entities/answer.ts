import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Optional } from '@core/types/optional';
import { AnswerAttachmentList } from './answerAttachmentList';

export interface AnswerProps {
  content: string;
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  attachments: AnswerAttachmentList;
  createdAt: Date;
  updatedAt?: Date;
}
export class Answer extends Entity<AnswerProps> {
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

	get attachments() {
		return this.props.attachments;
	}
  
	private touch() {
		this.props.updatedAt = new Date();
	}

	set attachments(attachments: AnswerAttachmentList) {
		this.props.attachments = attachments;
		this.touch();
	}

	static create(props: Optional<AnswerProps, 'createdAt' | 'attachments'>, id?: UniqueEntityID) {
		const answer = new Answer({
			...props,
			attachments: props.attachments ?? new AnswerAttachmentList,
			createdAt: new Date()
		}, id);
		return answer;
	}
}
