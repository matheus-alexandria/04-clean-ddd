export class Question {
  public title: string;
  public content: string;

  constructor({ content, title }: Question.Params) {
    this.content = content;
    this.title = title;
  }
}

export namespace Question {
  export type Params = {
    title: string;
    content: string;
  }
}