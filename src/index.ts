import { cors } from "hono/cors";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import { prisma } from "./lib/prisma";
import { ProductsSchema } from "./modules/product/schema";

const app = new OpenAPIHono();

app.use(cors());

app.openapi(
  createRoute({
    method: "get",
    path: "/products",
    responses: {
      200: {
        content: { "application/json": { schema: ProductsSchema } },
        description: "Get all products",
      },
    },
  }),
  async (c) => {
    const products = await prisma.product.findMany();

    return c.json(products);
  }
);

// The OpenAPI documentation
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Amazing Safari API",
    version: "1.0.0",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
