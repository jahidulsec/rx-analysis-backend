import { Hono } from "hono";
import { userRouter } from "./v1/user";
import { otherRouter } from "./v1/other";
import { surveyRoutes } from "./v1/survey";
import { authRoutes } from "./v1/auth";
import { verifyToken } from "@/middlewares/verify-token";

const router = new Hono();

router.route("/auth/v1", authRoutes);

// Apply verifyToken to all other /user, /other, /survey routes
router.use("*", async (c, next) => {
  // Skip token verification for /auth/v1
  if (c.req.path.startsWith("/auth/v1")) return next();
  return verifyToken(c, next);
});

// Mount protected routes
router.route("/user/v1", userRouter);
router.route("/other/v1", otherRouter);
router.route("/survey/v1", surveyRoutes);

export default router;
