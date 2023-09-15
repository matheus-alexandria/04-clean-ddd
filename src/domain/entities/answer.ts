import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/uniqueEntityId";
import { Optional } from "../../core/types/optional";

export class Answer extends Entity<Answer.Params> {
  get content() {
    return this.props.content;
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
