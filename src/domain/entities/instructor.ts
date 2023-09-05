export class Instructor {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export namespace Instructor {
  export type Params = {
    name: string;
  }
}