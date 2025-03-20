import { Hono } from "hono";
import { prisma } from "./lib/prisma";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Amazing Safari Backend REST API",
  });
});

app.get("/products", async (c) => {
  const products = await prisma.product.findMany();

  return c.json(products);
});

export default app;
