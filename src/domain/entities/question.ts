import { randomUUID } from "node:crypto";
import { Slug } from "./valueObjects/slug";
import { Entity } from "../../core/entities/entity";

export class Question extends Entity<Question.Params> {
  constructor(props: Question.Params, id?: string) {
    super({
      _id: id,
      props: props
    });
  }
}

export namespace Question {
  export type Params = {
    title: string;
    content: string;
    slug: Slug;
    authorId: string;
  }
}
