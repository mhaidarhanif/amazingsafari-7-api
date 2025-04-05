import { z } from "@hono/zod-openapi";

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string(),
  price: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProductsSchema = z.array(ProductSchema);
