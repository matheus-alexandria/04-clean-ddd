class Student {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export namespace Student {
  export type Params = {
    name: string;
  }
}