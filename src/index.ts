import { serve } from "@hono/node-server";
import { app } from "./app";

const port = 5008

serve(
  {
    fetch: app.fetch,
    port: port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
