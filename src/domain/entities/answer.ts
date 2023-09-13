import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/uniqueEntityId";

export class Answer extends Entity<Answer.Params> {
  get content() {
    return this.props.content;
  }
}

export namespace Answer {
  export type Params = {
    content: string;
    authorId: UniqueEntityID;
    questionId: UniqueEntityID;
  }
}
