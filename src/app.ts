import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { logger } from "hono/logger";
import router from "./routes";
import "dotenv/config";

export const app = new Hono();

app.use(logger());
app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  return c.text("Welcome to Radiant RX Analysis API");
});

app.route("/api", router);
