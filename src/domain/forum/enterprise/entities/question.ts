import { Slug } from '@domain/forum/enterprise/entities/valueObjects/slug';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Optional } from '@core/types/optional';
import { AggregateRoot } from '@core/entities/aggregateRoot';
import { QuestionAttachmentList } from './questionAttachmentList';

export interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  attachments: QuestionAttachmentList
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {
	get title() {
		return this.props.title;
	}
  
	get content() {
		return this.props.content;
	}
  
	get slug() {
		return this.props.slug;
	}
  
	get authorId() {
		return this.props.authorId;
	}
  
	get bestAnswerId() {
		return this.props.bestAnswerId;
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

	get excerpt() {
		return this.content.substring(0,120).trimEnd().concat('...');
	}

	set content(content: string) {
		this.props.content = content;
		this.touch(); 
	}

	set title(title: string) {
		this.props.title = title;
		this.props.slug = Slug.createFromText(title);
		this.touch();
	}

	set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
		this.props.bestAnswerId = bestAnswerId;
		this.touch(); 
	}

	set attachments(attachments: QuestionAttachmentList) {
		this.props.attachments = attachments;
	}
  
	static create(props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>, id?: UniqueEntityID) {
		const question = new Question({
			...props,
			slug: Slug.createFromText(props.title),
			attachments: props.attachments ?? new QuestionAttachmentList(),
			createdAt: props.createdAt ?? new Date(),
		}, id );

		return question;
	}
}
