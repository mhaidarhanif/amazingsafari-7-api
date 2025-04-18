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

export const authRoute = new OpenAPIHono();

// POST /auth/register
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/register",
    request: {
      body: { content: { "application/json": { schema: RegisterUserSchema } } },
    },
    responses: {
      200: {
        content: { "application/json": { schema: PublicUserSchema } },
        description: "Successfully registered",
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: { create: { hash: await hashPassword(body.password) } },
      },
      omit: { email: true },
    });

    return c.json(user);
  }
);

// POST /auth/login
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/login",
    request: {
      body: { content: { "application/json": { schema: LoginUserSchema } } },
    },
    responses: {
      200: {
        content: { "application/json": { schema: LoginResponseSchema } },
        description: "Successfully logged in",
      },
      404: {
        description: "Failed to login",
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const user = await prisma.user.findUnique({
      where: { email: body.email },
      include: { password: true },
    });
    if (!user) {
      return c.json({ message: "User not found" }, 400);
    }
    if (!user.password?.hash) {
      return c.json({ message: "User does not have a password" }, 400);
    }

    const isValid = await verifyPassword(user.password.hash, body.password);
    if (!isValid) {
      return c.json({ message: "Invalid password" }, 400);
    }

    const token = generateToken(user.id);

    return c.json({
      token,
    });
  }
);

// POST /auth/me
authRoute.openapi(
  createRoute({
    method: "get",
    path: "/me",
    middleware: checkAuthorized,
    responses: {
      200: {
        content: { "application/json": { schema: PrivateUserSchema } },
        description: "Get user info",
      },
    },
  }),
  async (c) => {
    const user = c.get("user");
    return c.json(user);
  }
);
