import { randomUUID } from "node:crypto";
import { Entity } from "../../core/entities/entity";

class Student extends Entity {
  public name: string;

  constructor({ name, id }: Student.Params) {
    super({_id: id});
    this.name = name;
  }
}

export namespace Student {
  export type Params = {
    name: string;
    id: string;
  }
}