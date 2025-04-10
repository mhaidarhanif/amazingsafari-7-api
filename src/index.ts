import { cors } from "hono/cors";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import { prisma } from "./lib/prisma";
import { ProductsSchema } from "./modules/product/schema";
import { productsRoute } from "./routes/products";

const app = new OpenAPIHono();

app.use(cors());

app.route("/products", productsRoute);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Amazing Safari API",
    version: "1.0.0",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
