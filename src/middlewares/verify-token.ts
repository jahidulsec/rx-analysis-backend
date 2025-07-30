import { forbiddenError, unauthorizedError } from "@/lib/errors";
import type { Context, Next } from "hono";
import { verify } from "hono/jwt";

export async function verifyToken(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader?.startsWith("Bearer")) {
    forbiddenError("Invalid token");
  }

  const token = authHeader && authHeader?.split(" ")[1]; // token example: Bearer <TOKEN>

  if (token == null) {
    unauthorizedError("Invalid token");
  }

  try {
    const payload = await verify(
      token as string,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    c.set("jwtPayload", payload);
    await next();
  } catch (error) {
    console.error(error);
    unauthorizedError("Invalid Token");
  }
}
