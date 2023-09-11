import { randomUUID } from "node:crypto";
import { Entity } from "../../core/entities/entity";

export class Instructor extends Entity {
  public name: string;

  constructor({ name, id }: Instructor.Params) {
    super({_id: id});
    this.name = name;
  }
}

export namespace Instructor {
  export type Params = {
    name: string;
    id?: string;
  }
}