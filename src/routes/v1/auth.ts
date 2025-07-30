import controller from "@/api/v1/auth";
import { Hono } from "hono";

const auth = new Hono();

// login
auth.post("/login", ...controller.login);

export { auth as authRoutes };
