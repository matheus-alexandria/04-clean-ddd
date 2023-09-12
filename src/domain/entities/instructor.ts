import { randomUUID } from "node:crypto";
import { Entity } from "../../core/entities/entity";

export class Instructor extends Entity<Instructor.Params> {
  constructor(props: Instructor.Params, id?: string) {
    super({
      _id: id,
      props: props,
    });
  }
}

export namespace Instructor {
  export type Params = {
    name: string;
  }
}