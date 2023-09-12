import { Entity } from "../../core/entities/entity";

export class Instructor extends Entity<Instructor.Params> {
}

export namespace Instructor {
  export type Params = {
    name: string;
  }
}