import { Slug } from "./valueObjects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/uniqueEntityId";
import { Optional } from "../../core/types/optional";

export class Question extends Entity<Question.Params> {
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
  
  static create(props: Optional<Question.Params, 'createdAt' | 'slug'>, id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      slug: Slug.createFromText(props.title),
      createdAt: new Date(),
    }, id );

    return question;
  }
}

export namespace Question {
  export type Params = {
    title: string;
    content: string;
    slug: Slug;
    authorId: UniqueEntityID;
    bestAnswerId: UniqueEntityID;
    createdAt: Date;
    updatedAt?: Date;
  }
}
