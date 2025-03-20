import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Amazing Safari Backend REST API",
  });
});

export default app;
