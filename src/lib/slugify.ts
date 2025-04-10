import slugify from "slugify";

export function createNewSlug(text: string) {
  return slugify(text, { lower: true });
}
