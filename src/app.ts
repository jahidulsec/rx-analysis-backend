import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { logger } from "hono/logger";

export const app = new Hono();

app.use(logger())
app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
