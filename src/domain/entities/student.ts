import { randomUUID } from "node:crypto";
import { Entity } from "../../core/entities/entity";

class Student extends Entity<Student.Params> {
  constructor(props: Student.Params, id?: string) {
    super({
      _id: id,
      props: props
    });
  }
}

export namespace Student {
  export type Params = {
    name: string;
  }
}