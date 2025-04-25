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
import { CartSchema } from "../modules/cart/schema";

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
