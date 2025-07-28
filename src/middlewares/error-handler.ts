import { createError } from "@/lib/errors";
import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";

const isDrizzleError = (e: unknown): e is Error & { cause?: unknown } =>
  e instanceof Error && e.name.includes("Drizzle");

export const errorHandler = (err: Error, c: Context) => {
  const cause = err.cause as any;

  return c.json(
    createError(false, "Server Error", "Internal Error", 500, 50001)
  );
};
