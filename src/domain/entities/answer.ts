import { randomUUID } from "node:crypto";

export class Answer {
  public content: string;
  public id: string;
  public authorId: string;
  public questionId: string;

  constructor({ content, id, authorId, questionId }: Answer.Params) {
    this.content = content;
    this.authorId = authorId;
    this.questionId = questionId;
    this.id = id ?? randomUUID();
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
