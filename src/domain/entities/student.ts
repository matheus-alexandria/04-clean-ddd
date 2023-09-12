import { Entity } from "../../core/entities/entity";

class Student extends Entity<Student.Params> {}

export namespace Student {
  export type Params = {
    name: string;
  }
}