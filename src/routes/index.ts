import { Hono } from "hono";
import { userRouter } from "./v1/user";
import { otherRouter } from "./v1/other";
import { surveyRoutes } from "./v1/survey";

const router = new Hono();

router.route("/user/v1", userRouter);
router.route("/other/v1", otherRouter);
router.route("/survey/v1", surveyRoutes);

export default router;
