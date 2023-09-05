import { randomUUID } from "node:crypto";

export class Instructor {
  public name: string;
  public id: string;

  constructor({ name, id }: Instructor.Params) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}

export namespace Instructor {
  export type Params = {
    name: string;
    id?: string;
  }
}