import { randomUUID } from "node:crypto";
import { Entity } from "../../core/entities/entity";

export class Answer extends Entity {
  public content: string;
  public authorId: string;
  public questionId: string;

  constructor({ content, id, authorId, questionId }: Answer.Params) {
    super({_id: id});

    this.content = content;
    this.authorId = authorId;
    this.questionId = questionId;
  }
}

export namespace Answer {
  export type Params = {
    content: string;
    id?: string;
    authorId: string;
    questionId: string;
  }
}
