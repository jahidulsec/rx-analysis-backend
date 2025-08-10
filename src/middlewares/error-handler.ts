import { createError } from "@/lib/errors";
import type { Context } from "hono";

export const errorHandler = (err: Error, c: Context) => {
  return c.json(
    createError(false, "Server Error", "internal Error", 500, 50001)
  );
};
