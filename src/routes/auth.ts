import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../lib/prisma";
import { z } from "@hono/zod-openapi";
import { RegisterUserSchema, UserSchema } from "../modules/user/schema";
import { hashPassword } from "../lib/password";

export const authRoute = new OpenAPIHono();

// GET all auth
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/register",
    request: {
      body: { content: { "application/json": { schema: RegisterUserSchema } } },
    },
    responses: {
      200: {
        content: { "application/json": { schema: UserSchema } },
        description: "Get all auth",
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
