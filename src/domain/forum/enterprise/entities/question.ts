import { Slug } from '@domain/forum/enterprise/entities/valueObjects/slug';
import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Optional } from '@core/types/optional';

export interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
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
  
	static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: UniqueEntityID) {
		const question = new Question({
			...props,
			slug: Slug.createFromText(props.title),
			createdAt: props.createdAt ?? new Date(),
		}, id );

		return question;
	}
}
