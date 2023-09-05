import { randomUUID } from "node:crypto";

class Student {
  public name: string;
  public id: string;

  constructor({ name, id }: Student.Params) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}

export namespace Student {
  export type Params = {
    name: string;
    id: string;
  }
}