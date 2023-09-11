import { randomUUID } from "node:crypto";
import { Slug } from "./valueObjects/slug";
import { Entity } from "../../core/entities/entity";

export class Question extends Entity {
  public title: string;
  public content: string;
  public authorId: string;
  public slug: Slug;

  constructor({ content, title, authorId, id, slug }: Question.Params) {
    super({_id: id});
    this.content = content;
    this.title = title;
    this.slug = slug;
    this.authorId = authorId;
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
