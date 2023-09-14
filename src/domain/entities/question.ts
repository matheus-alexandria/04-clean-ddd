import { Slug } from "./valueObjects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/uniqueEntityId";

export class Question extends Entity<Question.Params> {}

export namespace Question {
  export type Params = {
    title: string;
    content: string;
    slug: Slug;
    authorId: UniqueEntityID;
    bestAnswerId: UniqueEntityID;
    createdAt: Date;
    updatedAt?: Date;
  }
}
