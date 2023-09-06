import { randomUUID } from "node:crypto";

export class Question {
  public title: string;
  public content: string;
  public id: string;
  public authorId: string;

  constructor({ content, title, authorId, id }: Question.Params) {
    this.content = content;
    this.title = title;
    this.authorId = authorId;
    this.id = id ?? randomUUID();
  }
}

export namespace Question {
  export type Params = {
    title: string;
    content: string;
    id?: string;
    authorId: string;
  }
}
