import { randomUUID } from "crypto";

export class Entity {
  private _id: string;

  get id() {
    return this._id;
  }

  constructor({_id}: Entity.Params) {
    this._id = _id ?? randomUUID();
  }
}

export namespace Entity {
  export type Params = {
    _id?: string;
  }
}