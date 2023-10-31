import { AggregateRoot } from '@core/entities/aggregateRoot';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';

export interface CommentProps {
  content: string;
  authorId: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
}
export abstract class Comment<
  Props extends CommentProps
> extends AggregateRoot<Props> {
	get content() {
		return this.props.content;
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	get authorId() {
		return this.props.authorId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
}
