import { createError } from "@/lib/errors";
import type { Context } from "hono";

export const errorHandler = (err: Error, c: Context) => {
  const cause = err.cause as any;

  return c.json(
    createError(false, "Server Error", "Internal Error", 500, 50001)
  );
};
