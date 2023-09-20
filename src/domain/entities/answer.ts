import { Entity } from "@core/entities/entity";
import { UniqueEntityID } from "@core/entities/uniqueEntityId";
import { Optional } from "@core/types/optional";

export class Answer extends Entity<Answer.Params> {
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

  static create(props: Optional<Answer.Params, 'createdAt'>, id?: UniqueEntityID) {
    const answer = new Answer({
      ...props,
      createdAt: new Date()
    }, id);
    return answer;
  }
}

export namespace Answer {
  export type Params = {
    content: string;
    authorId: UniqueEntityID;
    questionId: UniqueEntityID;
    createdAt: Date;
    updatedAt?: Date;
  }
}
