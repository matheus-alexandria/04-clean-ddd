import { Entity } from "../../core/entities/entity";

export class Answer extends Entity<Answer.Params> {
  get content() {
    return this.props.content;
  }
}

export namespace Answer {
  export type Params = {
    content: string;
    authorId: string;
    questionId: string;
  }
}
