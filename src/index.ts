import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { productsRoute } from "./routes/products";
import { usersRoute } from "./routes/users";
import { authRoute } from "./routes/auth";

const app = new OpenAPIHono();

app.use(cors());

app.route("/products", productsRoute);
app.route("/users", usersRoute);
app.route("/auth", authRoute);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Amazing Safari API",
    version: "1.0.0",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
