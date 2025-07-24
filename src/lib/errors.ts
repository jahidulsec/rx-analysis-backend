import type { AppError } from "@/types/error";
import { HTTPException } from "hono/http-exception";

export const createError = (
  success: boolean,
  error: string,
  message: string,
  statusCode: number,
  errorCode: number
): AppError => {
  return { success, error, message, statusCode, errorCode };
};

export const notFoundError = (message: string): never => {
  throw new HTTPException(404, {
    message, // Optional text message
    res: new Response(
      JSON.stringify(createError(false, "Not Found", message, 404, 40401)),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  });
};
export const badRequestError = (message: string): never => {
  throw createError(false, "Bad Request", message, 400, 40001);
};

export const unauthorizedError = (message: string): never => {
  throw createError(false, "Unauthorized", message, 401, 40101);
};

export const forbiddenError = (message: string): never => {
  throw createError(false, "Forbidden!", message, 403, 40301);
};

export const conflictError = (message: string): never => {
  throw createError(false, "Conflct!", message, 409, 40901);
};

export const serverError = (message: string): never => {
  throw createError(false, "Internal Server Error", message, 500, 50001);
};
