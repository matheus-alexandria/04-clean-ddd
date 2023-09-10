import { randomUUID } from "node:crypto";
import { Slug } from "./valueObjects/slug";

export class Question {
  public title: string;
  public content: string;
  public id: string;
  public authorId: string;
  public slug: Slug;

  constructor({ content, title, authorId, id, slug }: Question.Params) {
    this.content = content;
    this.title = title;
    this.slug = slug;
    this.authorId = authorId;
    this.id = id ?? randomUUID();
  }
}

export namespace Question {
  export type Params = {
    title: string;
    content: string;
    slug: Slug;
    id?: string;
    authorId: string;
  }
}
