import { DrizzleError } from "drizzle-orm";
import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";

interface ErrorResponse {
  success: boolean;
  error: string;
  message: string;
  statusCode: StatusCode;
  code: number;
  errors?: { field?: string; message: string; code: string }[];
}

const isDrizzleError = (e: unknown): e is Error & { cause?: unknown } =>
  e instanceof Error && e.name.includes("Drizzle");

export const errorHandler = (err: Error, c: Context) => {
  let statusCode: StatusCode = 500;
  let code = 50001;
  let error = err.name || "Internal Server Error";
  let message = err.message || "Internal Server Error";
  let errorDetails: ErrorResponse["errors"] | undefined;

  const cause = err.cause as any;

  // zod error
  if (err instanceof ZodError) {
    statusCode = 400;
    code = 40002;
    error = "Bad Request";
    message = "Invalid input data";
    errorDetails = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));
  }

  // drizzle error
  if (cause && cause?.code && cause?.code === "ER_DUP_ENTRY") {
    // MySQL unique constraint
    statusCode = 409;
    code = 40901;
    error = cause.code || "Bad request";
    message = (err?.cause as any)?.message || err.message || "Drizzle Error";
  }

  console.error(err);

  c.status(statusCode);
  return c.json({
    success: false,
    code: code,
    error: error,
    message: message,
    errors: errorDetails,
  });
};
