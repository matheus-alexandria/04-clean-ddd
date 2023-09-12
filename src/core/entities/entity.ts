import { randomUUID } from "crypto";

export class Entity<Props> {
  private _id: string;
  protected props: Props;

  get id() {
    return this._id;
  }

  constructor({ _id, props }: Entity.Params<Props>) {
    this.props = props;
    this._id = _id ?? randomUUID();
  }
}

export namespace Entity {
  export type Params<Props> = {
    _id?: string;
    props: Props;
  }
}