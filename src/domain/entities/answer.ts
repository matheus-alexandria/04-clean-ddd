import { randomUUID } from "node:crypto";

export class Answer {
  public content: string;
  public id: string;

  constructor({ content, id }: Answer.Params) {
    this.content = content;
    this.id = id ?? randomUUID();
  }
}

export namespace Answer {
  export type Params = {
    content: string;
    id?: string;
  }
}
