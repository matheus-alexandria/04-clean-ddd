export class Slug {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Receives a string and normalize it as a slug.
   * 
   * Example: "An example string" => "an-example-string"
   * 
   * @param text {string}
   */
  static createFromText(text: string) {

  }
}