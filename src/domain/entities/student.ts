import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/uniqueEntityId";

class Student extends Entity<Student.Params> {
  static create(props: Student.Params, id?: UniqueEntityID) {
    const student = new Student(props, id);
    return student;
  }
}

export namespace Student {
  export type Params = {
    name: string;
  }
}