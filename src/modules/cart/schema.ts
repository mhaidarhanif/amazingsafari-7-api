import { z } from "@hono/zod-openapi";
import { ProductSchema } from "../product/schema";
import { PublicUserSchema } from "../user/schema";

/**
 * Cart
 *   items
 *     CartItem
 *       quantity
 *       product
 *         Product
 */

export const CartItemSchema = z.object({
  id: z.string(),

  quantity: z.number(),

  productId: z.string(),
  product: ProductSchema,

  cartId: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CartSchema = z.object({
  id: z.string(),

  items: z.array(CartItemSchema),

  userId: z.string(),
  user: PublicUserSchema.optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Cart = z.infer<typeof CartSchema>;
