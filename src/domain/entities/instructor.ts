import { Entity } from "@core/entities/entity";
import { UniqueEntityID } from "@core/entities/uniqueEntityId";

export class Instructor extends Entity<Instructor.Params> {
  get name() {
    return this.props.name;
  }

  static create(props: Instructor.Params, id?: UniqueEntityID) {
    const instructor = new Instructor(props, id);
    return instructor;
  }
}

export namespace Instructor {
  export type Params = {
    name: string;
  }
}