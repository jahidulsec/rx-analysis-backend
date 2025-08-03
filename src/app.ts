import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { logger } from "hono/logger";
import router from "./routes";
import "dotenv/config";
import { HTTPException } from "hono/http-exception";
import { errorHandler } from "./middlewares/error-handler";

export const app = new Hono();

app.use(logger());
app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  return c.text("Welcome to Radiant RX Analysis API");
});

// set api route
app.route("/api", router);

app.notFound((c) => {
  c.status(404);
  return c.json({
    status: false,
    error: "NotFound",
    message: "Page not found: " + c.req.url,
    statusCode: 404,
    errorCode: 40401,
  });
});

app.onError((err, c) => {
  console.error(err);

  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return errorHandler(err, c);
});
