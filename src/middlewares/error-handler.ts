import type { Context } from "hono";

interface ErrorResponse {
  success: boolean;
  error: string;
  message: string;
  statusCode: number;
  code: number;
  errors?: { field?: string; message: string; code: string }[];
}

export const errorHandler = (err: Error, c: Context) => {
  c.status(500);
  return c.json({
    sucess: false,
    code: 500,
    error: err.name,
    message: err.message,
  });
};
