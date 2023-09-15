import { Slug } from "./valueObjects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/uniqueEntityId";
import { Optional } from "../../core/types/optional";

export class Question extends Entity<Question.Params> {
  static create(props: Optional<Question.Params, 'createdAt'>, id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
    }, id );

    return question;
  }
}

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
