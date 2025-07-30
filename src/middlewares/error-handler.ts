import { createError } from "@/lib/errors";
import type { Context } from "hono";

export const errorHandler = (err: Error, c: Context) => {

  console.error(err)

  return c.json(
    createError(false, "Server Error", "Internal Error", 500, 50001)
  );
};
