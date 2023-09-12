import { Entity } from "../../core/entities/entity";

export class Answer extends Entity<Answer.Params> {
  get content() {
    return this.props.content;
  }

  constructor(props: Answer.Params, id?: string) {
    super({
      _id: id,
      props: props
    });
  }
}

export namespace Answer {
  export type Params = {
    content: string;
    authorId: string;
    questionId: string;
  }
}
