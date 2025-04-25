import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../lib/prisma";
import {
  LoginResponseSchema,
  LoginUserSchema,
  RegisterUserSchema,
  PublicUserSchema,
  PrivateUserSchema,
} from "../modules/user/schema";
import { hashPassword, verifyPassword } from "../lib/password";
import { generateToken } from "../lib/token";
import { checkAuthorized } from "../modules/auth/middleware";
import {
  AddCartItemSchema,
  CartItemSchema,
  CartSchema,
} from "../modules/cart/schema";

export const cartRoute = new OpenAPIHono();

// GET /cart
cartRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    middleware: checkAuthorized,
    responses: {
      200: {
        content: { "application/json": { schema: CartSchema } },
        description: "Get cart",
      },
    },
  }),
  async (c) => {
    const user = c.get("user");

    const cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      const newCart = await prisma.cart.create({
        data: { userId: user.id },
        include: { items: { include: { product: true } } },
      });

      return c.json(newCart);
    }

    return c.json(cart);
  }
);

// POST /cart/items
cartRoute.openapi(
  createRoute({
    method: "post",
    path: "/items",
    middleware: checkAuthorized,
    request: {
      body: { content: { "application/json": { schema: AddCartItemSchema } } },
    },
    responses: {
      200: {
        content: { "application/json": { schema: CartItemSchema } },
        description: "Add item to cart",
      },
      400: {
        description: "Failed to add item to cart",
      },
    },
  }),
  async (c) => {
    try {
      const body = c.req.valid("json");
      const user = c.get("user");

      const cart = await prisma.cart.findFirst({
        where: { userId: user.id },
      });

      if (!cart) {
        return c.json({ message: "Cart not found" }, 400);
      }

      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: body.productId,
          quantity: body.quantity,
        },
        include: { product: true },
      });

      return c.json(newCartItem);
    } catch (error) {
      return c.json({ message: "Failed to add item to cart" }, 400);
    }
  }
);
