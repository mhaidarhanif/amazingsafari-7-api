import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../lib/prisma";
import { ProductSchema, ProductsSchema } from "../modules/product/schema";
import { z } from "@hono/zod-openapi";

export const productsRoute = new OpenAPIHono();

// GET all products
productsRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
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

// GET product by slug
productsRoute.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    request: {
      params: z.object({
        slug: z.string(),
      }),
    },
    responses: {
      200: {
        content: { "application/json": { schema: ProductSchema } },
        description: "Get product by slug",
      },
      404: {
        description: "Product not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");
    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return c.notFound();
    }

    return c.json(product);
  }
);

// POST new product
productsRoute.openapi(
  createRoute({
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": {
            schema: ProductSchema.omit({
              id: true,
              createdAt: true,
              updatedAt: true,
            }),
          },
        },
      },
    },
    responses: {
      201: {
        content: { "application/json": { schema: ProductSchema } },
        description: "Product created successfully",
      },
    },
  }),
  async (c) => {
    const data = await c.req.json();
    const product = await prisma.product.create({
      data,
    });
    return c.json(product, 201);
  }
);

// DELETE product by id
productsRoute.openapi(
  createRoute({
    method: "delete",
    path: "/{id}",
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      204: {
        description: "Product deleted successfully",
      },
      404: {
        description: "Product not found",
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    const product = await prisma.product.delete({
      where: { id },
    });

    if (!product) {
      return c.notFound();
    }

    return c.body(null, 204);
  }
);
