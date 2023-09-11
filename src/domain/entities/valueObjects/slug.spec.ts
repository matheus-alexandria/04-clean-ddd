import { expect, it } from "vitest";
import { Slug } from "./slug";

it('should be able to create slug from text', () => {
  const slug = Slug.createFromText('An example (text)');

  expect(slug.value).toEqual('an-example-text');
});