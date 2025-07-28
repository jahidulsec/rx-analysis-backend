import type { AppError } from "@/types/error";
import type { Context } from "hono";
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
  throw new HTTPException(404, {
    message, // Optional text message
    res: new Response(
      JSON.stringify(createError(false, "Bad Request", message, 400, 40001)),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  });
};

export const unauthorizedError = (message: string): never => {
  throw new HTTPException(404, {
    message, // Optional text message
    res: new Response(
      JSON.stringify(createError(false, "Unauthorized", message, 401, 40101)),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  });
};

export const forbiddenError = (message: string): never => {
  throw new HTTPException(404, {
    message, // Optional text message
    res: new Response(
      JSON.stringify(createError(false, "Forbidden!", message, 403, 40301)),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  });
};

export const conflictError = (message: string): never => {
  throw new HTTPException(404, {
    message, // Optional text message
    res: new Response(
      JSON.stringify(createError(false, "Conflct!", message, 409, 40901)),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  });
};

export const serverError = (message: string): never => {
  throw new HTTPException(404, {
    message, // Optional text message
    res: new Response(
      JSON.stringify(
        createError(false, "Internal Server Error", message, 500, 50001)
      ),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  });
};

export const validationError = (c: Context, result: any) => {
  return c.json(
    {
      success: false,
      error: "ValidationError",
      errors: result.error.issues.map((issue: any) => ({
        field: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      })),
    },
    422
  );
};
